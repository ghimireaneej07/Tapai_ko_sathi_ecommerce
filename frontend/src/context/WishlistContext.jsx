import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WISHLIST_STORAGE_KEY = "tapai_ko_sathi:wishlist:v1";

const WishlistContext = createContext(null);

function normalizeText(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildProductKey(product = {}) {
  if (product?.id !== undefined && product?.id !== null) {
    return `id:${String(product.id)}`;
  }

  const slug = product?.slug || normalizeText(product?.name || "product");
  return `slug:${slug}`;
}

function toWishlistItem(product = {}) {
  return {
    key: buildProductKey(product),
    id: product?.id ?? null,
    slug: product?.slug ?? "",
    name: product?.name || "Wishlist Product",
    description: product?.description || "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    image_url: product?.image_url || "",
    category: product?.category || null,
  };
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    try {
      const rawWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!rawWishlist) {
        return;
      }

      const parsed = JSON.parse(rawWishlist);
      if (Array.isArray(parsed)) {
        setWishlistItems(parsed);
      }
    } catch {
      setWishlistItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isInWishlist = useCallback(
    (product) => {
      const productKey = buildProductKey(product);
      return wishlistItems.some((item) => item.key === productKey);
    },
    [wishlistItems],
  );

  const addToWishlist = useCallback((product) => {
    const nextItem = toWishlistItem(product);

    setWishlistItems((currentItems) => {
      if (currentItems.some((item) => item.key === nextItem.key)) {
        return currentItems;
      }
      return [nextItem, ...currentItems];
    });
  }, []);

  const removeFromWishlist = useCallback((product) => {
    const productKey = typeof product === "string" ? product : buildProductKey(product);
    setWishlistItems((currentItems) => currentItems.filter((item) => item.key !== productKey));
  }, []);

  const toggleWishlist = useCallback(
    (product) => {
      const productKey = buildProductKey(product);
      let saved = false;

      setWishlistItems((currentItems) => {
        if (currentItems.some((item) => item.key === productKey)) {
          return currentItems.filter((item) => item.key !== productKey);
        }

        saved = true;
        return [toWishlistItem(product), ...currentItems];
      });

      return saved;
    },
    [],
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const value = useMemo(
    () => ({
      wishlistItems,
      wishlistCount: wishlistItems.length,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
    }),
    [wishlistItems, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return context;
}
