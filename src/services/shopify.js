const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
export const shopifyEnabled = import.meta.env.VITE_SHOPIFY_ENABLED === 'true';

export async function shopifyRequest(query, variables = {}) {
  if (!shopifyEnabled || !domain || !token) throw new Error('Shopify is not configured');
  const response = await fetch(`https://${domain}/api/2025-07/graphql.json`, {method:'POST',headers:{'Content-Type':'application/json','X-Shopify-Storefront-Access-Token':token},body:JSON.stringify({query,variables})});
  if (!response.ok) throw new Error('The shop is temporarily unavailable');
  const payload = await response.json();
  if (payload.errors) throw new Error(payload.errors[0]?.message || 'Shopify request failed');
  return payload.data;
}
