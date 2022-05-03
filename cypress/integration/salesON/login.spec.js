import LoginPage from '../../support/Pages/LoginPage.js'
import credentials from '../../fixtures/credentials.json'

describe('Login to system', () => {
    it('Successful login to system', () => {
        cy.fixture('credentials')
            const loginPage = new LoginPage()
            loginPage.loginToSystem(credentials.testLogin,credentials.testPassword)
            cy.url().should('eq','https://demo1.saleson.pl/dashboard/')
    })
  

  it('Fail login to system using wrong credentials', () => {
        cy.fixture('credentials')
            const loginPage = new LoginPage()
            loginPage.loginToSystem(credentials.wrongLogin,credentials.wrongPassword)                            
            cy.get('.alert').should('be.visible')
            cy.contains('Nieprawidłowe dane.').should('be.visible')
    })
    //  Visit https://demo1.saleson.pl/login and do not login to system
})


