describe('Feature tour', () => {
  let todoTitle = 'New Todo';
  let itemTitle = 'New Item';
  it('should navigate to the home page', () => {
    cy.visit('http://localhost:3001');
  });

  it('should create a new todo', () => {
    cy.get('input[type*="text"]').type(todoTitle);
    cy.get('form button').click();
  });

  it('should navigate to todo detail page', () => {
    cy.get('li a').first().click();
    cy.url().should('include', '/todos');
  });

  it('should create a new todo item', () => {
    cy.get('input[type*="text"]').type(itemTitle);
    cy.get('form button').click();
  });

  it('should update the todo item', () => {
    cy.get('[data-cypress="checked"]').should('not.be.visible');
    cy.get('label').first().click();
    // cy.get('[data-cypress="checked"]').should('be.visible');
  });

  it('should delete the todo item', () => {
    cy.get('[data-testid="todo-item"]').first().find('button').click();
    cy.get('[data-testid="todo-item"]').should('not.be.visible');
  });

  it('should navigate back to the home page', () => {
    cy.get('a[href="/"]').click();
    cy.url().should('not.include', '/todos');
  });

  it('should delete the original todo', () => {
    cy.get('li').first().find('button').click();
  });
});
