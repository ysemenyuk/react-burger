describe('Test drag and drop constructor', () => {
  before(() => cy.visit('http://localhost:3000'));

  it('open constructor page', () => {
    cy.contains('Соберите бургер');
  });

  it('load ingredients', () => {
    cy.get('[class^=IngridientCard_itemCard]').as('cards');
    cy.get('@cards').first().as('bun');

    cy.get('@bun').should('exist');
    cy.get('@bun').find('img').should('be.visible');

    cy.get('@cards').contains('Мясо бессмертных моллюсков Protostomia').should('exist');
    cy.get('@cards').contains('Соус фирменный Space Sauce').should('exist');
    cy.get('@cards').contains('Сыр с астероидной плесенью').should('exist');
  });

  it('drag and drop constructor', () => {
    cy.get('[class^=BurgerConstructor_dropTarget]').first().as('dropTarget');
    cy.get('[class^=IngridientCard_itemCard]').as('cards');

    cy.get('@cards').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('@dropTarget').trigger('drop');

    cy.get('@cards').contains('Мясо бессмертных моллюсков Protostomia').trigger('dragstart');
    cy.get('@dropTarget').trigger('drop');

    cy.get('@cards').contains('Соус фирменный Space Sauce').trigger('dragstart');
    cy.get('@dropTarget').trigger('drop');

    cy.get('@cards').contains('Сыр с астероидной плесенью').trigger('dragstart');
    cy.get('@dropTarget').trigger('drop');

    cy.get('@cards').contains('Сыр с астероидной плесенью').trigger('dragstart');
    cy.get('@dropTarget').trigger('drop');
  });
});
