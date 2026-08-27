const read = key => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
export const state = {cart:read('morrow-cart'),wishlist:read('morrow-wishlist')};
export const save = () => {localStorage.setItem('morrow-cart',JSON.stringify(state.cart));localStorage.setItem('morrow-wishlist',JSON.stringify(state.wishlist));};
export const cartCount = () => state.cart.reduce((sum,item)=>sum+item.quantity,0);
