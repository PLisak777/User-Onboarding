describe('Testing form component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('adds text to input and submits', () => {
        cy.get('[data-cy=name]')
        .type('Jayne')
        .should('have.value', 'Jayne');
        
        cy.get('[data-cy=email]')
        .type('jayne@jayne.com')
        .should('have.value', 'jayne@jayne.com')
        .clear()
        
        cy.get('[data-cy=password]')
        .type('password')
        .should('have.value', 'password')
        
        cy.get('[data-cy=terms]')
        .check()
        .should('be.checked')

        cy.get('[data-cy=submit]')
        .click()
    }) 
})