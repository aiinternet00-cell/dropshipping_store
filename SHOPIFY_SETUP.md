# Shopify Storefront setup

## 1. Create Storefront API access

In Shopify Admin, go to **Settings → Apps and sales channels → Develop apps**, create an app, and configure Storefront API scopes. Enable product/catalog reading and cart access, install the app, then copy its **Storefront access token**. Do not use or expose an Admin API secret.

## 2. Configure the project

Copy `.env.example` to `.env.local`:

```env
VITE_SHOPIFY_ENABLED=true
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token
```

Vite injects these values at build time. Add `.env.local` to `.gitignore` and configure the same variables in the hosting provider dashboard. Storefront tokens should still receive only the minimum required scopes.

## 3. Match products

Query products by `handle` through Storefront GraphQL and map the returned title, images, price ranges, and variants into the UI model in `src/data/products.js`. Shopify variant IDs are global GraphQL IDs and must be retained for cart lines; do not substitute local product IDs.

## 4. Create and update a cart

Use `cartCreate` with merchandise/variant IDs and quantities. Persist the returned cart ID in browser storage. Use `cartLinesAdd`, `cartLinesUpdate`, and `cartLinesRemove` as quantities change. Refresh the cart query after mutations and surface GraphQL `userErrors` in the drawer instead of breaking the page.

## 5. Checkout

The cart query returns `checkoutUrl`. The Checkout button should navigate to that URL. Shopify owns payment and final checkout. Do not build a custom card form or store payment information in this project.

All requests belong in `src/services/shopify.js`. Keep local catalogue mode as a graceful fallback for development or temporary API failures.
