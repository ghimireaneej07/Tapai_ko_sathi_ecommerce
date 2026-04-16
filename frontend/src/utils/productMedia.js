const mediaModules = import.meta.glob("../../media/{products,staff_fav_section}/*.{png,jpg,jpeg,avif,webp}", {
  eager: true,
  import: "default",
});

function normalizeIdentifier(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashText(value = "") {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const mediaByFileName = new Map(
  Object.entries(mediaModules).map(([path, src]) => [path.split("/").pop() || "", src]),
);

const productImageFileBySlug = {
  "ashwagandha-powder": "ashwagandha_root.png",
  "dried-tulsi-leaves": "tulsi(holy basil) infusion.png",
  "organic-moong-dal": "new_arrival_illam_green_tea.png",
  "raw-himalayan-honey": "raw_himalayan_forest_honey.png",
  "turmeric-powder-golden": "wild_himalayan_turmeric.png",
  "triphala-powder": "pure_cow ghee.png",
  "dried-ginger-root": "neem_and_alow_mint _shop.png",
  "brahmi-powder": "artisan_bamboo_tea.png",
  "black-cumin-seeds": "himalayan_pink_salt.png",
  "shatavari-powder": "organic_turmeric.png",
};

const fallbackImageFiles = [
  "raw_himalayan_forest_honey.png",
  "wild_himalayan_honey.png",
  "ashwagandha_root.png",
  "wild_himalayan_turmeric.png",
  "organic_turmeric.png",
  "tulsi(holy basil) infusion.png",
  "artisan_bamboo_tea.png",
  "himalayan_pink_salt.png",
  "new_arrival_illam_green_tea.png",
  "pure_cow ghee.png",
];

const descriptionByImageFile = {
  "ashwagandha_root.png": "Ground Ashwagandha root traditionally used to support stress resilience, stamina, and daily vitality.",
  "tulsi(holy basil) infusion.png": "Holy basil infusion blend with a calming herbal profile for immunity and daily respiratory comfort.",
  "new_arrival_illam_green_tea.png": "Fresh Ilam green tea leaves with a clean taste and natural antioxidants for mindful daily sipping.",
  "raw_himalayan_forest_honey.png": "Unprocessed forest honey from Himalayan regions with rich floral notes and natural sweetness.",
  "wild_himalayan_turmeric.png": "Wild Himalayan turmeric known for earthy aroma and high-curcumin support for everyday wellness routines.",
  "pure_cow ghee.png": "Slow-clarified pure cow ghee crafted for traditional cooking, nourishment, and Ayurvedic diet routines.",
  "neem_and_alow_mint _shop.png": "Neem and aloe mint herbal blend prepared for balanced cleansing support and refreshing daily use.",
  "artisan_bamboo_tea.png": "Artisan bamboo tea with a light woody profile, curated for soothing hydration and herbal rituals.",
  "himalayan_pink_salt.png": "Mineral-rich Himalayan pink salt for clean seasoning and balanced everyday meal preparation.",
  "organic_turmeric.png": "Organic turmeric powder with bright color and warm notes, ideal for immunity-focused recipes and tonics.",
  "wild_himalayan_honey.png": "Wild Himalayan honey collected from high-altitude flora for robust taste and natural energy support.",
};

function resolveFileNameForProduct(product = {}) {
  const slug = normalizeIdentifier(product?.slug || "");
  if (slug && productImageFileBySlug[slug]) {
    return productImageFileBySlug[slug];
  }

  const normalizedName = normalizeIdentifier(product?.name || product?.product_name || "");
  if (normalizedName && productImageFileBySlug[normalizedName]) {
    return productImageFileBySlug[normalizedName];
  }

  for (const [productSlug, fileName] of Object.entries(productImageFileBySlug)) {
    if (normalizedName && (normalizedName.includes(productSlug) || productSlug.includes(normalizedName))) {
      return fileName;
    }
  }

  if (normalizedName.includes("honey")) {
    return "raw_himalayan_forest_honey.png";
  }

  const index = hashText(slug || normalizedName || String(product?.id || "fallback")) % fallbackImageFiles.length;
  return fallbackImageFiles[index];
}

function formatImageTitle(fileName = "") {
  return String(fileName)
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[()_]+/g, " ")
    .replace(/[^a-z0-9 ]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function resolveProductImage(product = {}) {
  if (product?.image_url) {
    return product.image_url;
  }

  const fileName = resolveFileNameForProduct(product);
  return mediaByFileName.get(fileName) || mediaByFileName.get("raw_himalayan_forest_honey.png") || "";
}

export function resolveProductImageFileName(product = {}) {
  return resolveFileNameForProduct(product);
}

export function buildProductImageTitle(product = {}) {
  const fileName = resolveFileNameForProduct(product);
  return formatImageTitle(fileName) || product?.name || "Ayurvedic Product";
}

export function buildProductDisplayDescription(product = {}) {
  const fileName = resolveFileNameForProduct(product);
  if (descriptionByImageFile[fileName]) {
    return descriptionByImageFile[fileName];
  }

  const title = buildProductImageTitle(product);
  return `${title} crafted for natural wellness support and everyday herbal living.`;
}

export function buildProductImageAlt(product = {}) {
  return `${buildProductImageTitle(product)} - natural wellness product from Tapai Ko Sathi`;
}
