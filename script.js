function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
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
// REQUISITO 3
const cartList = document.querySelector('.cart__items');
cartList.removeChild(event.target);
}
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => {
  // REQUISITO 1 PARTE 2
  // RESOLUÇÃO: Percorri os results do produto computador e criei um novo objeto contendo o sku, name e image, esse sendo filho do elemento pai que contém a classe item.
  const computador = fetchProducts('computador');
  computador.then((data) => {
    data.results.forEach((element) => {
      const novoObjeto = {
        sku: element.id,
        name: element.title,
        image: element.thumbnail,
      };
      document
        .querySelector('.items')
        .appendChild(createProductItemElement(novoObjeto));
    });
  });
};
