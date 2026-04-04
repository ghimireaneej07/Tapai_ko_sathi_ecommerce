from django.contrib import admin

from .models import Category, Product, Cart, CartItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "featured", "is_active", "created_at")
    list_filter = ("category", "featured", "is_active", "created_at")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    fieldsets = (
        ("Product Information", {
            "fields": ("name", "slug", "category", "description")
        }),
        ("Pricing & Stock", {
            "fields": ("price", "stock")
        }),
        ("Media & Status", {
            "fields": ("image_url", "featured", "is_active")
        }),
        ("Metadata", {
            "fields": ("created_at",),
            "classes": ("collapse",)
        }),
    )
    readonly_fields = ("created_at",)
    date_hierarchy = "created_at"


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("user", "updated_at")
    search_fields = ("user__username", "user__email")
    readonly_fields = ("user", "updated_at")


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity")
    list_filter = ("cart__user",)
    search_fields = ("product__name", "cart__user__username")
