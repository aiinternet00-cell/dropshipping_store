# Morrow

A responsive, editorial storefront for a premium pet-goods brand. The default local catalogue works without a backend; Shopify can be enabled when the store is ready.

## Run locally

```bash
npm install
npm run dev
```

Build and preview the production bundle with `npm run build` and `npm run preview`.

## Edit the store

- **Brand:** Update the name, editorial copy, navigation, and footer in `src/main.js`; update colors and typography in `src/styles/main.css`.
- **Products and prices:** Each product lives in `src/data/products.js`. Change its `name`, numeric `price`, category `type`, color, description, or badge there.
- **Images:** Change a product's `image` URL in `src/data/products.js`. The image component provides loading and failure states automatically.
- **Add a product:** Copy one object in the `products` array and give it a unique URL-safe `id`. Its collection card and `/product/:id` detail route are generated automatically.

## Shopify

Copy `.env.example` to `.env.local`, enter the shop domain and Storefront API token, then set `VITE_SHOPIFY_ENABLED=true`. Never commit `.env.local` or a private Admin API token. See [SHOPIFY_SETUP.md](SHOPIFY_SETUP.md) for the full connection and cart workflow.

## Deployment

Run `npm run build`; upload the generated `dist/` directory to Netlify, Vercel, Cloudflare Pages, or any static host. For GitHub Pages, deploy `dist/` with a Pages action. Because this site uses hash routes and root-relative source paths, product URLs work without rewrite rules (use a custom domain or host at the account root).
