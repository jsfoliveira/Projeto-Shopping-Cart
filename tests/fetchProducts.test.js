require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // REQUISITO 8 - FEITO - OK
  it('Verificar se fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
  // Não consigo fazer sem o expect.assertions. Ele geralmente é útil ao testar código assíncrono, para garantir que as asserções em um retorno de chamada sejam realmente chamadas.
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async () => {
    const response = await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    // toHaveBeenCalled serve pra testar se a função foi chamado. toHaveBeenCalledWith é para testar com algum argumento em específico.
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const response = await fetchProducts('computador');
    expect(response).toBe(computadorSearch);
  });

  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
          await fetchProducts();
        } catch (error) {
          return new Error ('You must provide an url')
      } 
  });
});