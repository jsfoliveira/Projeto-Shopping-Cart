const fetchProducts = (query) => {
  // RESOLUÇÃO: No código abaixo, estou chamando a Fetch API e passando o URL para a Random User API. Então, uma resposta é recebida. No entanto, a resposta recebida não é JSON, mas um objeto com uma série de métodos que podem ser usados dependendo do que quero fazer com as informações. Para converter o objeto retornado em JSON, usei o data.json(). 
  const produto = query;
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  return fetch(url)
    .then((data) => data.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
