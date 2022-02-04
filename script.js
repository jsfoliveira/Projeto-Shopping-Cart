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
// REQUISITO 3 - OK
// RESOLUÇÃO: vai remover o conteúdo de todo ol (cart__items).
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
// REQUISITO 2 - PARTE 1
// RESOLUÇÃO: Eu tive ajuda de Sheila Arelo. Criei a função que vai ser responsável por adicionar produto no carrinho. Vai pegando o conteúdo do primeiro elemento do pai e vai criando um objeto com o id, title e price. Essa informação vai ser guardada em um elemento li que será filho do ol. Irá fazer isso com cada firstchild criado.
 const carrinho = async (event) => {
  const getSku = event.target.parentElement.firstChild.innerText; // getSku quer retornar o conteúdo do primeiro filho do elemento pai do item__sku.
  const data = await fetchItem(getSku);
  const objeto = { sku: data.id, name: data.title, salePrice: data.price };
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement(objeto));
};
// REQUISITO 6 - PARTE 1 - FALTA TERMINAR
// const apagaTudo = () => {
//   const cartItem = document.querySelectorAll('.cart__item');
//   cartItem.innerHTML = '';
// };

// REQUISITO 1 - PARTE 2
// RESOLUÇÃO: O conteúdo do results vai ser percorrido (que é um array de objetos), vai pegando o id, title e thumbnail de cada objeto. O createProductItemElement vai criar a section que vai armazenar os spans que vão conter todas essas informações.
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
  // REQUISITO 6 - PARTE 2 - FALTA TERMINAR
  // const empty = document.querySelector('.empty-cart');
  // empty.addEventListener('click', apagaTudo);
};