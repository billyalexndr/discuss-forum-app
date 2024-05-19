describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Sign In$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Sign In$/).click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testemail@gmail.com');
    cy.get('button').contains(/^Sign In$/).click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('testemail@gmail.com');
    cy.get('input[placeholder="Password"]').should('be.enabled').type('password');
    cy.get('button').contains(/^Sign In$/).click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="Email"]').should('be.visible').and('be.enabled');
    cy.get('input[placeholder="Email"]').type('chris@gmail.com');

    cy.get('input[placeholder="Password"]').should('be.visible').and('be.enabled');
    cy.get('input[placeholder="Password"]').type('chriss');

    cy.get('button').contains(/^Sign In$/).should('be.visible').click({ force: true });

    cy.get('nav').should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });
});
