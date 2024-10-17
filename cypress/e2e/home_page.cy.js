describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should load the homepage', () => {
    cy.get('[data-test="homepage-header"]').should('contain.text', 'E-Commerce Store')
    })

  it('display products and correct product information', () => {
    // Verify that product grid exists
    cy.get('.ui.centered.container.four.column.grid').should('exist')

    // Verify that there is at least 1 item showing
    cy.get('.ui.centered.container.four.column.grid > .column').should('have.length.at.least', 1)

    // Check the content of the second product item
    cy.get('.ui.centered.container.four.column.grid > .column').eq(1).within(() => {
      cy.get('.ui.card.product-card').should('exist')
      cy.get('.header').should('be.visible') // Product title
      cy.get('.price').should('be.visible')   // Product price
    })
  })

  it('should properly route to other pages', () => {
    cy.get('.ui.centered.container.four.column.grid > .column').first().click() // click the first product in the list
    cy.get('[data-test="homepage-header"]').should('not.exist') // check that no longer on home page
    cy.get('[data-test="home-button"]').click() // return to homepage
    cy.get('[data-test="homepage-header"]').should('exist') //check that back on home page
    cy.get('[data-test="cart-button"]').click() // go to cart
    cy.get('[data-test="homepage-header"]').should('not.exist') // check that no longer on home page
    cy.get('[data-test="home-button"]').click() // return to homepage
    cy.get('[data-test="homepage-header"]').should('exist') //check that back on home page
  })

})