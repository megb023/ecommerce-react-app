describe('Product detail', () => {

  beforeEach(() => {
    cy.visit('/')

  })

  it('check that product detail page matches product selected', () => {
    cy.visit('/')
    let productName='';
    let productPrice='';

    function extractPrice(text) {
      // Match everything up to and including the last digit
      const match = text.match(/^.*\d/);
      return match ? match[0].trim() : '';
    }

    cy.get('.ui.card').first().within(() => {
      // Get product name
      cy.get('.header')
        .invoke('text')
        .then((text) => {
          productName = text.trim();
        })
      
      // Get product price
      cy.get('.price')
        .invoke('text')
        .then((text) => {
          productPrice = text.trim();
        });
    });

    cy.get('.ui.centered.container.four.column.grid > .column').first().click() // click the first product in the list
    
    cy.url().should('include', '/product/');

    cy.get('h1').should('be.visible').invoke('text').then((detailName) => {
      expect(detailName.trim()).to.equal(productName);
    })

    cy.get('[data-test="Price"]').should('be.visible').invoke('text').then((text) => {
      const detailPrice = extractPrice(text);
      expect(detailPrice).to.equal(productPrice);
       
      });
  });

  it('add to cart quanitity button works with respective quanitities', () => {
    // go to product detail page
    cy.get('.ui.centered.container.four.column.grid > .column').first().click();

    // check that both the quanity input box and button show a qty of 1
    cy.get('[data-test="quantity"]').children().should('be.visible').should('have.value', '1');
    cy.get('[data-test="addToCart"]').should('be.visible').should('have.text', 'Add to Cart (1)');

    // check that trying to change the qty to less than 1 doesn't work
    cy.get('[data-test="minusButton"]').click();
    cy.get('[data-test="quantity"]').children().should('be.visible').should('have.value', '1');
    cy.get('[data-test="addToCart"]').should('be.visible').should('have.text', 'Add to Cart (1)');

    //check that increasing the quantity updates the add to cart button as well as the text box
    cy.get('[data-test="plusButton"]').click().click().click();
    cy.get('[data-test="quantity"]').children().should('be.visible').should('have.value', '4');
    cy.get('[data-test="addToCart"]').should('be.visible').should('have.text', 'Add to Cart (4)');

    //check that the minus button works and inputing/typing a value works
    cy.get('[data-test="minusButton"]').click()
    cy.get('[data-test="quantity"]').children().should('be.visible').should('have.value', '3');
    cy.get('[data-test="addToCart"]').should('be.visible').should('have.text', 'Add to Cart (3)');

    cy.get('[data-test="quantity"]').children().type('2');
    cy.get('[data-test="quantity"]').children().should('be.visible').should('have.value', '32');
    cy.get('[data-test="addToCart"]').should('be.visible').should('have.text', 'Add to Cart (32)');

    //check that the 'Go to Cart' Button functionality works
    cy.get('[data-test="goToCart"]').should('have.text', 'Go to Cart');
    cy.get('[data-test="goToCart"]').click();
    cy.url().should('include', '/cart')
  });
});