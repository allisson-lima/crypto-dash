describe('Coins Table', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/coins*', {
      fixture: 'coins.json',
    }).as('getCoins');

    cy.visit('/');
  });

  it('deve mostrar loading ao carregar', () => {
    cy.intercept('GET', '/api/coins*', (req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    }).as('delayedCoins');

    cy.visit('/');
    cy.wait(500);
    cy.get('#skeleton-table').should('exist');
    cy.wait(500);
  });

  it('deve exibir o gráfico sparkline se disponível', () => {
    cy.wait(500);
    cy.get('#sparkline').should('exist');
  });

  it('deve favoritar e desfavoritar uma moeda', () => {
    cy.wait(500);
    cy.get('.border-b > :nth-child(1) > .flex > .inline-flex').click();
    cy.get('svg').should('have.class', 'fill-yellow-400');
    cy.wait(500);
    cy.get('.border-b > :nth-child(1) > .flex > .inline-flex').click();
    cy.get('svg').should('not.have.class', 'fill-yellow-400');
  });
});
