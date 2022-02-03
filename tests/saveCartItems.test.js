const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
// REQUISITO 10 PARTE 2 - OK
localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    const item = '<ol><li>Item</li></ol>';
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    const item = '<ol><li>Item</li></ol>';
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', item);
  });
});
