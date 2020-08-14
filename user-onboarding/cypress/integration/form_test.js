describe("Testing form"), () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000')
    })
}
it('Add text to input and submit'), () => {
    cy.get('[data-cy=name]')
    .type('Jayne')
    .should('have.value', 'Jayne');

    cy.get('[data-cy=email]')
    .type('jayne@jayne.com')
    .should('have.value', 'jayne@jayne.com')

    cy.get('[data-cy=password]')
    .type('password')
    .should('have.value', 'password')

    cy.get('[data-cy=terms]')
    .check()
    .should('be.checked')


}