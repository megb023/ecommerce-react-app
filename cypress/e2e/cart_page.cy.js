describe('Cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Empty cart shows correct page', () => {
    cy.get('[data-test="cart-button"]').click()
    cy.get('body').then($body => {
      if ($body.find('button.red').length > 0) {
        // Button exists, so click all instances
        cy.get('button.red').click({ multiple: true });
      } else {
        // No button found, log a message and continue
        cy.log('No buttons found to click');
      }
    })
  })
})