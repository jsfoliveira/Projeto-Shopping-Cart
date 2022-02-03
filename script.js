// Criando a função que vai definir o que vai conter e a classe da image
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// Criando a função que vai definir o que vai conter e a classe do sku e name
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// Função que cria a seção que vão conter todos os produtos
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
function cartItemClickListener(event) {
// Função queu, ao clicar no li, apaga o li
// REQUISITO 3
const cartList = document.querySelector('.cart__items');
cartList.removeChild(event.target);
}
// Função que cria os li 
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
 const carrinho = async (event) => {
  const getSku = getSkuFromProductItem(event.target.parentElement);
  const data = await fetchItem(getSku);
  const objeto = { sku: data.id, name: data.title, salePrice: data.price };
  document.querySelector('.cart__items').appendChild(createCartItemElement(objeto));
};
// REQUISITO 2
window.onload = async () => {
  await fetchProducts('computador')
    .then((data) => {
      data.results.forEach((item) => {
        const objeto = { sku: item.id, name: item.title, image: item.thumbnail };
        const pegarItem = document.querySelector('.items');
        pegarItem.appendChild(createProductItemElement(objeto));
      });
  });
  const btnAdd = document.querySelectorAll('.item__add');
  btnAdd.forEach((button) => button.addEventListener('click', carrinho));
};