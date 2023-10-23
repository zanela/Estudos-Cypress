const faker = require('faker');
const nomeFicticio = faker.name.firstName();
const sobrenomeFicticio = faker.name.lastName();
const cepFicticio = faker.address.zipCode();

function realizarLogin() {
  //Dado que aceso o site
  cy.visit('/');
  cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  cy.wait(2000); // Espera por 2 segundos (2000 milissegundos)
  cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
}

describe('Usuário deve Logar e fazer uma compra', () => {

  it('Cenário 1: Realizar uma compra', () => {
    realizarLogin();

    //Quando adiciono um item no carrinho
    cy.get('#item_4_title_link > .inventory_item_name').click();
    cy.get('.inventory_details_name').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.wait(2000); // Espera por 2 segundos (2000 milissegundos)

    // E preencho os campos "nome", "Sobrenome" e "Codigo postal"
    cy.get('[data-test="firstName"]').type(nomeFicticio);
    cy.get('[data-test="lastName"]').type(sobrenomeFicticio);
    cy.get('[data-test="postalCode"]').type(cepFicticio);
    cy.wait(1000); // Espera por 1 segundo (1000 milissegundos)

    //Então a venda é concluída e volto à página inicial
    cy.get('[data-test="continue"]').click();
    cy.wait(1000); // Espera por 1 segundo (1000 milissegundos)
    cy.get('button[id="finish"]').click();
    cy.get('button[name="back-to-products"]').click();

    // Captura de screenshot ao final do teste
    cy.screenshot('screenshot-final');
  });

  it('Cenário 2: Adicionar e remover itens', () => {
    realizarLogin();

    //Dado que acesso o site
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.wait(2000); // Espera por 2 segundos (2000 milissegundos)
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');

    // Quando seleciono diversos produtos e adicono ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    cy.get('.shopping_cart_link').click();

    //Então remova os itens que foram adicionados
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').click();
    cy.get('[data-test="remove-sauce-labs-onesie"]').click();
    cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type(nomeFicticio);
    cy.get('[data-test="lastName"]').type(sobrenomeFicticio);
    cy.get('[data-test="postalCode"]').type(cepFicticio);
    cy.wait(1000); // Espera por 1 segundo (1000 milissegundos)

    cy.get('[data-test="continue"]').click();
    cy.screenshot('screenshot-final1');
    cy.get('[data-test="finish"]').click();
  });
});
