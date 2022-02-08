const cartItems = document.querySelector('.cart__items');

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

// Seleciona o ID do item
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// REQUISITO 5 - parte 1
// Pegando os itens do carrinho e transformando em array.
// function getItems() {
//   const cartItem = document.querySelectorAll('.cart__item');
//   // console.log(cartItem);
//   // const arrayCartItem = Array.from(cartItem);
//   // console.log(arrayCartItem);
//   console.log(cartItem);
//   return cartItem;
// }

// REQUISITO 5 - PARTE 1
// Tive ajuda do colega Vinícius de Paula.
// RESOLUÇÃO: Percorri com o forEach cada cart__item está no carrinho, acessei só o valor que tem no PRICE, mas a partir do $ e somando ao total
function pegarPreco() {
  let total = 0;
  const cartItemsAll = document.querySelectorAll('.cart__item');
  cartItemsAll.forEach((element) => {
    // element.innerText vai mostrar o SKU, o name e o PRICE. O PRICE SERÁ "PRICE: $2396.06". Com o .split('PRICE: $')[1], vai pegar a string "PRICE: $2396.06" e vai dividir em substrings a partir dos dois pontos, por isso que tem que ser [1], porque vai começar do $2396.06, o elemento[0] é um espaço vazio com $, o segundo será 239.06.
    const precoItens = element.innerText.split('PRICE: $')[1];
    // essa parte
    total += parseFloat(precoItens); 
  });
  return total;
}
// REQUISITO 5 - PARTE 2
// RESOLUÇÃO: Estou adicionando os valores do lado do Total que está no carriho.
function somarPrecos() {
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = pegarPreco();
}

// REQUISITO 3: Função que, ao clicar no li, apaga o li
// RESOLUÇÃO: vai remover o conteúdo de todo ol (cart__items).
function cartItemClickListener(event) {
cartItems.removeChild(event.target);
// REQUISITO 4 - Quando eu clicar no cart__item, que ele apague do localStorage.
saveCartItems(cartItems.innerHTML);
// REQUISITO 5 - Quando eu apagar o li, que apague seu preço também.
somarPrecos();
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
  const getSku = event.target.parentNode; // getSku quer retornar o conteúdo do primeiro filho do elemento pai do item__sku.
  const data = await fetchItem(getSkuFromProductItem(getSku));
  const objeto = { sku: data.id, name: data.title, salePrice: data.price };
  cartItems.appendChild(createCartItemElement(objeto));
// REQUISITO 4 - Quando eu clicar no cart__item, que ele salve do localStorage.
  saveCartItems(cartItems.innerHTML);
// REQUISITO 5 - Que ao adicionar o produto no carrinho, que esse preço seja adicionado no total.
  somarPrecos();
};

// REQUISITO 6 - PARTE 1
// RESOLUÇÃO: Acessei o ol que armazena todas as li, através do cartItem. Percorri cada elemento e fui removendo.
const apagarTudo = () => {
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((element) => {
    element.remove();
  });
// REQUISITO 5 - quando eu remover o li, que seja removido também o preço.
  somarPrecos();
};

// REQUISITO 4 -  A função getSavedCartItems deve recuperar os itens do carrinho de compras do localStorage quando carregamos a página.
// RESOLUÇÃO: Ao clicar em cada filho do elemento cartItems, que estão no carrinho e que também foram salvos no localstorage, vai ativar a função cartItemClickListener.
const recuperarItem = () => {
  cartItems.innerHTML = getSavedCartItems();
  console.log(cartItems); // vão aparecer os itens salvos no local storage
  cartItems.childNodes.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

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

  // REQUISITO 6 - PARTE 2
  // RESOLUÇÃO: Acessei o botão 'Esvaziar carrinho' e adicionei um eventListener para ativar a função apagaTudo ao clicar nele.
  const empty = document.querySelector('.empty-cart');
  empty.addEventListener('click', apagarTudo);
  document.querySelector('.loading').remove(); // Requisito 7 parte 2 - remover o "...carregando". O requisito 7 parte 1 está no index.html.
  // REQUISITO 4
  recuperarItem();
};