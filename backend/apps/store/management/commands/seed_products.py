from django.core.management.base import BaseCommand
from apps.store.models import Category, Product
from decimal import Decimal


class Command(BaseCommand):
    help = "Seed the database with initial categories and products"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("🌱 Starting database seeding..."))

        # Create Categories
        categories_data = [
            {"name": "Herbal Medicines", "slug": "herbal-medicines"},
            {"name": "Raw Herbs", "slug": "raw-herbs"},
            {"name": "Grains & Legumes", "slug": "grains-legumes"},
            {"name": "Honey & Bee Products", "slug": "honey-bee"},
            {"name": "Spices", "slug": "spices"},
            {"name": "Powders", "slug": "powders"},
        ]

        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                slug=cat_data["slug"],
                defaults={"name": cat_data["name"]}
            )
            categories[cat_data["slug"]] = cat
            status = "✓ Created" if created else "• Exists"
            self.stdout.write(f"  {status}: {cat.name}")

        self.stdout.write(self.style.SUCCESS("\n✓ Categories complete\n"))

        # Create Products
        products_data = [
            {
                "category": "herbal-medicines",
                "name": "Ashwagandha Powder",
                "slug": "ashwagandha-powder",
                "description": "Pure Ashwagandha powder for stress relief and immunity",
                "price": Decimal("399.99"),
                "stock": 50,
                "featured": True,
                "is_active": True,
            },
            {
                "category": "raw-herbs",
                "name": "Dried Tulsi Leaves",
                "slug": "dried-tulsi-leaves",
                "description": "Organic dried Tulsi leaves for tea and remedies",
                "price": Decimal("299.99"),
                "stock": 75,
                "featured": True,
                "is_active": True,
            },
            {
                "category": "grains-legumes",
                "name": "Organic Moong Dal",
                "slug": "organic-moong-dal",
                "description": "Premium organic moong dal with 100% purity",
                "price": Decimal("189.99"),
                "stock": 100,
                "featured": False,
                "is_active": True,
            },
            {
                "category": "honey-bee",
                "name": "Raw Himalayan Honey",
                "slug": "raw-himalayan-honey",
                "description": "Pure raw honey from Himalayan regions",
                "price": Decimal("599.99"),
                "stock": 40,
                "featured": True,
                "is_active": True,
            },
            {
                "category": "spices",
                "name": "Turmeric Powder (Golden)",
                "slug": "turmeric-powder-golden",
                "description": "High curcumin turmeric powder for health benefits",
                "price": Decimal("249.99"),
                "stock": 80,
                "featured": False,
                "is_active": True,
            },
            {
                "category": "powders",
                "name": "Triphala Powder",
                "slug": "triphala-powder",
                "description": "Traditional Triphala for digestive wellness",
                "price": Decimal("349.99"),
                "stock": 60,
                "featured": True,
                "is_active": True,
            },
            {
                "category": "raw-herbs",
                "name": "Dried Ginger Root",
                "slug": "dried-ginger-root",
                "description": "Premium dried ginger for cooking and health",
                "price": Decimal("189.99"),
                "stock": 55,
                "featured": False,
                "is_active": True,
            },
            {
                "category": "herbal-medicines",
                "name": "Brahmi powder",
                "slug": "brahmi-powder",
                "description": "Brahmi powder for memory and cognitive health",
                "price": Decimal("449.99"),
                "stock": 45,
                "featured": False,
                "is_active": True,
            },
            {
                "category": "spices",
                "name": "Black Cumin Seeds",
                "slug": "black-cumin-seeds",
                "description": "Premium quality black cumin seeds (Kalonji)",
                "price": Decimal("279.99"),
                "stock": 70,
                "featured": False,
                "is_active": True,
            },
            {
                "category": "powders",
                "name": "Shatavari Powder",
                "slug": "shatavari-powder",
                "description": "Shatavari powder for female wellness and vitality",
                "price": Decimal("379.99"),
                "stock": 50,
                "featured": True,
                "is_active": True,
            },
        ]

        created_count = 0
        for prod_data in products_data:
            category = categories[prod_data.pop("category")]
            prod, created = Product.objects.get_or_create(
                slug=prod_data["slug"],
                defaults={**prod_data, "category": category}
            )
            if created:
                created_count += 1
                self.stdout.write(f"  ✓ Created: {prod.name} (₹{prod.price})")
            else:
                self.stdout.write(f"  • Exists: {prod.name}")

        self.stdout.write(self.style.SUCCESS(f"\n✓ Products complete ({created_count} new products created)\n"))
        self.stdout.write(self.style.SUCCESS("🎉 Database seeding successful!"))
