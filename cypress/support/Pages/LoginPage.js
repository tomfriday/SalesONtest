class LoginPage {
    loginToSystem(login,password) {
        let demo = Cypress.config().baseUrl; //accesing baseUrl 
        cy.visit(demo);
        cy.get('#username').type(login)
        cy.get('#password').type(password)
        cy.get('.green-button-login').click()
    }
}
export default LoginPage