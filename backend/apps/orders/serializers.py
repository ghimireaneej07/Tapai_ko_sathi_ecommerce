from django.db import transaction
from rest_framework import serializers

from apps.store.models import Cart

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = ("id", "product", "product_name", "quantity", "unit_price")
        read_only_fields = ("unit_price",)


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ("id", "full_name", "email", "address", "phone", "total", "status", "created_at", "items")
        read_only_fields = ("total", "status", "created_at")


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("full_name", "email", "address", "phone")

    @transaction.atomic
    def create(self, validated_data):
        user = self.context["request"].user
        cart, _ = Cart.objects.get_or_create(user=user)
        cart_items = cart.items.select_related("product")

        if not cart_items.exists():
            raise serializers.ValidationError("Cart is empty.")

        order = Order.objects.create(user=user, **validated_data)
        total = 0

        for item in cart_items:
            price = item.product.price
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity, unit_price=price)
            total += price * item.quantity

        order.total = total
        order.save(update_fields=["total"])
        cart_items.delete()
        return order
