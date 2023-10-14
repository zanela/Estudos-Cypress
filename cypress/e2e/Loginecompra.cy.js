describe('Usuário deve Logar e fazer uma compra', () => {
  
    it('Steps', () => {
   //Dado que aceso o site
    cy.visit('/')
    cy.get('[data-test="username"]').type ('standard_user');
    cy.get('[data-test="password"]').type ('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.wait(2000); // Espera por 2 segundos (2000 milissegundos)
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    //Quando adiciono um item no carrinho
    cy.get('#item_4_title_link > .inventory_item_name').click() ;
    //cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.inventory_details_name').click();
    //cy.get('[data-test="back-to-products"]').click()
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.wait(2000); // Espera por 2 segundos (2000 milissegundos)
    // E preencho os campos "nome", "Sobrenome" e "Codigo postal"
    cy.get('[data-test="firstName"]').type ('Leonardo');
    cy.get('[data-test="lastName"]').type ('Zanela');
    cy.get('[data-test="postalCode"]').type ('83820-575');
    cy.wait(1000);
    //Então a venda é concluida e volto a pagina inicial
    cy.get('[data-test="continue"]').click();
    cy.wait(1000);
    cy.get('button[id="finish"]').click();
    cy.get('button[name="back-to-products"]').click();
  
  })
})

