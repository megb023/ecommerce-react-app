describe('Cart', () => {
  beforeEach(() => {
    cy.visit('/')

  })

  it('Empty cart shows correct page', () => {
    cy.get('[data-test="cart-button"]').click()

    cy.get('body').then($body => {
      if ($body.find('table.ui.celled.table').length > 0) {

        // Count the initial number of rows
        cy.get('table.ui.celled.table tbody tr').its('length').then((initialRowCount) => {
          // Use a for loop to remove items
          for (let i = 0; i < initialRowCount; i++) {
            cy.get('table.ui.celled.table tbody tr')
              .first()
              .find('button.ui.red.icon.button')
              .click();

            // Wait for the row to be removed before continuing
            cy.get('table.ui.celled.table tbody tr').should('have.length', initialRowCount - i - 1);
          }

          // Verify that all items have been removed
          cy.get('table.ui.celled.table tbody tr').should('not.exist');
        });
      } else {
        // Table doesn't exist, log a message and continue
        cy.log('No table found. Continuing with the rest of the test.');
      }
    });
    // Check for "Your Cart" text
    cy.contains('Your Cart').should('be.visible');

    // Check for "Your cart is empty." text
    cy.contains('Your cart is empty.').should('be.visible');

  });

  it('Adds proper items and quantities to cart', () => {

    let productOneName, productOnePrice;

    function extractPrice(text) {
      // Match everything up to and including the last digit
      const match = text.match(/^.*\d/);
      return match ? match[0].trim() : '';
    }

    // select the first item on the page
    cy.get('.ui.centered.container.four.column.grid > .column').first().click();

    // Store the name and price of item as variables to check cart page later
    cy.get('h1').invoke('text').then(text => {
      productOneName = text;
    });
    cy.get('[data-test="Price"]').invoke('text').then(text => {
      productOnePrice = extractPrice(text);
    });

    // increase the quanitity to 4
    cy.get('[data-test="plusButton"]').click().click().click();

    // add the item to cart and go to the cart page
    cy.get('[data-test="addToCart"]').click();
    cy.get('[data-test="goToCart"]').click();

    // check that the product, price, quantity, and total all match up with the item added earlier
    cy.get('tbody[data-test="items-table"]')
      .find('tr')
      .first()
      .within(() => {
        cy.get('td').eq(0).should('contain', productOneName);
        cy.get('td').eq(1).should('contain', productOnePrice);
        cy.get('td').eq(2).find('input[type="number"]').should('have.value', '4');

        // Calculate expected total (assuming price is in format $XX.XX)
        const price = parseFloat(productOnePrice.replace('$', ''));
        const expectedTotal = (price * 4).toFixed(2);
        cy.get('td').eq(3).should('contain', `$${expectedTotal}`);

        cy.get('td').eq(4).find('button.ui.red.icon.button').should('exist');
      
    });
  });

  it('Saves cart contents and updates with new items added and removed', () => {

    function extractPrice(text) {
      // Match everything up to and including the last digit
      const match = text.match(/^.*\d/);
      return match ? match[0].trim() : '';
    }

    let productTwoName, productTwoPrice;
    // Click the 5th item on the list
    cy.get('[data-test="item-list"]').eq(4).click();

    // Store the name and price of item as variables to check cart page later
    cy.get('h1').invoke('text').then(text => {
      productTwoName = text;
    });
    cy.get('[data-test="Price"]').invoke('text').then(text => {
      productTwoPrice = extractPrice(text);
    });
    
    // add the item to cart and go to cart
    cy.get('[data-test="addToCart"]').click();
    cy.get('[data-test="cart-button"]').click();

    // Check that the original item is still there, length of table should be greate than 1
    cy.get('[data-test="items-table"]')
      .find('tr')
      .its('length')
      .should('be.gt', 1)

    // check that the second item was added correctly
    cy.get('[data-test="items-table"]')
      .find('tr')
      .eq(1)
      .within(() => {
        cy.get('td').eq(0).should('contain', productTwoName);
        cy.get('td').eq(1).should('contain', productTwoPrice);
        cy.get('td').eq(2).find('input[type="number"]').should('have.value', '1');
        cy.get('td').eq(3).should('contain', productTwoPrice);
      });

    // check that the total price is listed correctly at the bottom
  
    cy.get('[data-test="item-totals"]').then($prices => {
      const calculatedTotal = "$" + Array.from($prices).reduce((sum, el) => {
        const price = parseFloat(el.textContent.replace('$', ''))
        return sum + (isNaN(price) ? 0 : price)
      }, 0).toFixed(2)
      cy.log(`The calculated total is: ${calculatedTotal}`)

      cy.get('[data-test="total-price"]').then(($element) => {
        const displayedTotal = $element.text().split(" ")[1];
        cy.log(`The displayed total is: ${displayedTotal}`)

        expect(calculatedTotal).to.equal(displayedTotal, 
          'Calculated total should match displayed total')
      });
    
    // check that the "Proceed to Checkout Button is visible" and click it
    cy.get('[data-test="checkout-button"]').should('be.visible').click()
    cy.url().should('include', '/checkout')
    });
  });
});



