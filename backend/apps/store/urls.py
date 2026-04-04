from django.urls import path

from .views import (
    CartItemCreateView,
    CartItemUpdateDeleteView,
    CartView,
    CategoryListView,
    ProductDetailView,
    ProductListView,
)

urlpatterns = [
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("cart/", CartView.as_view(), name="cart"),
    path("cart/items/", CartItemCreateView.as_view(), name="cart-item-create"),
    path("cart/items/<int:item_id>/", CartItemUpdateDeleteView.as_view(), name="cart-item-update-delete"),
]
