import {products, money} from './data/products.js';
import {state, save, cartCount} from './utils/store.js';
import {icon} from './components/icons.js';
import {image, productCard, productSkeletons} from './components/ui.js';

const app = document.querySelector('#app');
let activeFilter = 'All';

const shell = content => `<header>
  <a class="logo" href="#/">MORROW</a>
  <nav><a href="#/shop">Shop</a><a href="#/wishlist">Wishlist</a><a href="#/about">Our story</a></nav>
  <div class="actions"><button data-search>Search</button><button data-open-cart>Bag <span data-count>${cartCount()}</span></button><button class="menu" data-menu aria-label="Open menu"><i></i><i></i></button></div>
</header><main>${content}</main>
<footer><div><a class="logo" href="#/">MORROW</a><p>Objects for animal lives.</p></div><div><h4>Explore</h4><a href="#/shop">Shop all</a><a href="#/wishlist">Wishlist</a><a href="#/about">Our story</a><a href="mailto:hello@morrow.pet">Contact</a></div><div><h4>Stay close</h4><p>Notes on good design and better days together.</p><form data-newsletter><input type="email" required placeholder="Email address"><button aria-label="Subscribe">${icon('arrow')}</button></form></div><small>© 2026 Morrow Goods</small></footer>
<div class="veil" data-close></div><aside class="drawer" data-drawer aria-live="polite"></aside><div class="toast" role="status"></div>`;

function home() { return shell(`<section class="hero">${image(products[0].image, 'A dog at ease', 'hero-media', true)}<div class="hero-copy"><p class="eyebrow">Considered goods for companions</p><h1>Made for the<br>life you share.</h1><a class="button light" href="#/shop">Explore the collection ${icon('arrow')}</a></div></section><section class="intro"><p class="eyebrow">The Morrow philosophy</p><h2>They make a home feel alive.<br>We make objects worthy of it.</h2><p>Quietly beautiful essentials, thoughtfully made for the rituals of life with animals.</p></section><section class="featured"><div class="section-head"><div><p class="eyebrow">Daily companions</p><h2>Favorites, by design</h2></div><a href="#/shop">Shop all ${icon('arrow')}</a></div><div class="product-grid">${products.slice(0, 4).map(productCard).join('')}</div></section><section class="manifesto"><div>${image(products[3].image, 'Dogs outdoors')}</div><div><p class="eyebrow">Live well, together</p><h2>Less clutter.<br>More companionship.</h2><p>We begin with a real need, strip away the unnecessary, and choose materials that feel better with time.</p><a href="#/about" class="text-link">Read our story ${icon('arrow')}</a></div></section>`); }

function shop() { return shell(`<section class="page-head"><p class="eyebrow">The collection</p><h1>Useful things,<br>beautifully considered.</h1></section><section class="shop"><div class="filters">${['All','Walk','Rest','Dine','Travel','Play'].map(x => `<button class="${x === activeFilter ? 'active' : ''}" data-filter="${x}">${x}</button>`).join('')}</div><div class="product-grid" data-grid>${products.filter(p => activeFilter === 'All' || p.type === activeFilter).map(productCard).join('')}</div><div class="no-results"><h2>No matches found</h2><p>Try another search.</p><button class="text-link" data-clear-search>View all products ${icon('arrow')}</button></div></section>`); }

function wishlist() { const saved = products.filter(p => state.wishlist.includes(p.id)); return shell(`<section class="page-head compact"><p class="eyebrow">Saved pieces</p><h1>Your wishlist.</h1></section><section class="shop">${saved.length ? `<div class="product-grid">${saved.map(productCard).join('')}</div>` : `<div class="empty small"><h2>Nothing saved yet.</h2><p>Keep the pieces you love close at hand.</p><a class="button dark" href="#/shop">Explore Products ${icon('arrow')}</a></div>`}</section>`); }

function product(id) { const p = products.find(x => x.id === id); if (!p) return notFound(); return shell(`<section class="detail"><div class="detail-image">${image(p.image,p.name,'',true)}</div><div class="detail-copy"><p class="eyebrow">${p.type} · ${p.color}</p><h1>${p.name}</h1><p class="price">${money(p.price)}</p><p class="lede">${p.description}</p><div class="choice"><span>Color</span><strong>${p.color}</strong></div><button class="button dark add" data-add="${p.id}">Add to bag <span>${money(p.price)}</span></button><button class="save ${state.wishlist.includes(p.id) ? 'active' : ''}" data-wish="${p.id}">${icon('heart')} Save for later</button>${['Details & care','Materials','Shipping & returns'].map((x,i) => `<div class="accordion"><button data-accordion aria-expanded="false">${x}<span>+</span></button><div><p>${i === 0 ? 'Designed for daily use. Wipe clean with a soft, damp cloth.' : i === 1 ? 'Selected durable, pet-safe materials with considered finishing.' : 'Complimentary shipping over $100. Returns accepted within 30 days.'}</p></div></div>`).join('')}</div></section><section class="featured"><div class="section-head"><h2>You may also like</h2></div><div class="product-grid">${products.filter(x => x.id !== p.id).slice(0,3).map(productCard).join('')}</div></section>`); }

function about() { return shell(`<section class="page-head story"><p class="eyebrow">Our story</p><h1>A shared life deserves thoughtful design.</h1><p>Morrow was born from a simple belief: objects made for pets can belong naturally in the homes we care about. We favor honest materials, restrained forms, and details that make daily rituals easier.</p></section><section class="wide-image">${image(products[2].image,'A walk together')}</section>`); }
function notFound() { return shell(`<section class="empty"><p class="eyebrow">404</p><h1>This trail ends here.</h1><a class="button dark" href="#/">Return home</a></section>`); }

function openDrawer() { document.body.classList.add('drawer-open'); }
function closeDrawer() { document.body.classList.remove('drawer-open'); }
function cart() { const drawer = document.querySelector('[data-drawer]'); drawer.innerHTML = `<div class="drawer-head"><h2>Your bag</h2><button data-close aria-label="Close">${icon('close')}</button></div><div class="cart-body cart-loading">${productSkeletons(2)}</div>`; openDrawer(); requestAnimationFrame(() => {
  const items = state.cart.map(i => { const p = products.find(x => x.id === i.id); if (!p) return ''; return `<div class="cart-item">${image(p.image,p.name)}<div><h3>${p.name}</h3><p>${money(p.price)}</p><div class="qty"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${i.quantity}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><button class="remove" data-remove="${p.id}">Remove</button></div>`; }).join('');
  const total = state.cart.reduce((sum,i) => { const p = products.find(x => x.id === i.id); return sum + (p ? p.price * i.quantity : 0); }, 0);
  drawer.innerHTML = `<div class="drawer-head"><h2>Your bag</h2><button data-close aria-label="Close">${icon('close')}</button></div><div class="cart-body">${items || `<div class="empty small"><h2>Your cart is waiting<br>for a new favorite.</h2><a class="button dark" href="#/shop" data-close>Explore Products</a></div>`}</div>${items ? `<div class="cart-foot"><div><span>Subtotal</span><strong>${money(total)}</strong></div><button class="button dark" data-checkout>Checkout</button><small>Taxes and shipping calculated at checkout.</small></div>` : ''}`;
}); }

function render() { const path = location.hash.slice(1) || '/'; app.innerHTML = path === '/' ? home() : path === '/shop' ? shop() : path === '/wishlist' ? wishlist() : path === '/about' ? about() : path.startsWith('/product/') ? product(path.split('/')[2]) : notFound(); window.scrollTo(0,0); }
function toast(text) { const el = document.querySelector('.toast'); el.textContent = text; el.classList.add('show'); setTimeout(() => el.classList.remove('show'),2200); }

document.addEventListener('click', event => {
  const target = event.target.closest('button,a'); if (!target) return;
  if (target.matches('[data-open-cart]')) cart();
  if (target.matches('[data-close]')) closeDrawer();
  if (target.matches('[data-add]')) { const found = state.cart.find(x => x.id === target.dataset.add); found ? found.quantity++ : state.cart.push({id:target.dataset.add,quantity:1}); save(); document.querySelector('[data-count]').textContent = cartCount(); target.classList.add('confirmed'); target.innerHTML = `Added to bag ${icon('arrow')}`; toast('Added to your bag'); }
  if (target.matches('[data-wish]')) { const id = target.dataset.wish, index = state.wishlist.indexOf(id); index < 0 ? state.wishlist.push(id) : state.wishlist.splice(index,1); save(); target.classList.toggle('active'); toast(index < 0 ? 'Saved to your wishlist' : 'Removed from wishlist'); if (location.hash === '#/wishlist') render(); }
  if (target.matches('[data-filter]')) { activeFilter = target.dataset.filter; render(); }
  if (target.matches('[data-clear-search]')) { activeFilter = 'All'; render(); }
  if (target.matches('[data-accordion]')) { const open = target.parentElement.classList.toggle('open'); target.setAttribute('aria-expanded',String(open)); }
  if (target.matches('[data-qty]')) { const item = state.cart.find(x => x.id === target.dataset.qty); item.quantity += Number(target.dataset.delta); if (item.quantity < 1) state.cart.splice(state.cart.indexOf(item),1); save(); cart(); }
  if (target.matches('[data-remove]')) { state.cart = state.cart.filter(x => x.id !== target.dataset.remove); save(); cart(); }
  if (target.matches('[data-menu]')) { const drawer = document.querySelector('[data-drawer]'); drawer.innerHTML = `<div class="drawer-head"><h2>Menu</h2><button data-close>${icon('close')}</button></div><nav class="mobile-nav"><a href="#/shop" data-close>Shop</a><a href="#/wishlist" data-close>Wishlist</a><a href="#/about" data-close>Our story</a></nav>`; openDrawer(); }
  if (target.matches('[data-search]')) showSearch();
  if (target.matches('[data-checkout]')) toast('Secure checkout will open when Shopify is connected');
});

function showSearch() { const drawer = document.querySelector('[data-drawer]'); drawer.innerHTML = `<div class="drawer-head"><h2>Search</h2><button data-close>${icon('close')}</button></div><form class="search-panel" data-search-form><label for="search">What are you looking for?</label><div><input id="search" name="query" autocomplete="off" placeholder="Bed, walk, travel…"><button class="button dark">Search ${icon('arrow')}</button></div></form>`; openDrawer(); setTimeout(() => drawer.querySelector('input').focus(),300); }
document.addEventListener('submit', event => { if (event.target.matches('[data-newsletter]')) { event.preventDefault(); event.target.reset(); toast('Thank you for joining us'); } if (event.target.matches('[data-search-form]')) { event.preventDefault(); const query = new FormData(event.target).get('query').trim().toLowerCase(); closeDrawer(); activeFilter = 'All'; location.hash = '/shop'; setTimeout(() => { const hits = products.filter(p => `${p.name} ${p.type} ${p.description}`.toLowerCase().includes(query)); document.querySelector('[data-grid]').innerHTML = hits.map(productCard).join(''); document.querySelector('.no-results').classList.toggle('show',!hits.length); },0); } });
window.addEventListener('hashchange',() => { closeDrawer(); render(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeDrawer(); });
render();
