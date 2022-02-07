// REQUISITO 10 PARTE 1
const saveCartItems = (item) => localStorage.setItem('cartItems', item);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
