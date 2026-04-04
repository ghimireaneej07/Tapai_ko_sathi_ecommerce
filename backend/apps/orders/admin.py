from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product", "quantity", "unit_price")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "full_name", "total", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("id", "user__username", "full_name", "email")
    readonly_fields = ("user", "total", "created_at")
    inlines = [OrderItemInline]
    fieldsets = (
        ("Customer Information", {
            "fields": ("user", "full_name", "email", "phone")
        }),
        ("Delivery Address", {
            "fields": ("address",)
        }),
        ("Order Details", {
            "fields": ("total", "status", "created_at")
        }),
    )
    date_hierarchy = "created_at"


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "quantity", "unit_price")
    list_filter = ("order__created_at",)
    search_fields = ("order__id", "product__name")
    readonly_fields = ("product", "quantity", "unit_price")
