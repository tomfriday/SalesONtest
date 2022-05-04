import credentials from '../../fixtures/credentials.json'
import testProfileDatas from '../../fixtures/testProfileDatas.json'
import LoginPage from '../../support/Pages/LoginPage.js'
import DashboardPage from '../../support/Pages/DashboardPage.js'
import MyProfileSettings from '../../support/Pages/MyProfileSettings.js'

beforeEach(() => {
    Cypress.Cookies.preserveOnce('SFSESSID2')
})

describe('Edit my profile', () => {
    
    before(() => {
        cy.fixture('credentials')
        const loginPage = new LoginPage()
        const dashboardPage = new DashboardPage()
        loginPage.loginToSystem(credentials.testLogin,credentials.testPassword)
        dashboardPage.clickOnProfileOptions()
        dashboardPage.chooseProfileOption('Mój profil')
    })
    it('Change Name and Surname in profile settings', () => {
        cy.fixture('testProfileDatas')
        const myProfileSettings = new MyProfileSettings()
        let randomElementFromNameArray = testProfileDatas.testNameArray[Math.floor(Math.random()* testProfileDatas.testNameArray.length)]
        let randomElementFromSurnameArray = testProfileDatas.testSurnameArray[Math.floor(Math.random()* testProfileDatas.testSurnameArray.length)]
        myProfileSettings.changeName(randomElementFromNameArray)
        myProfileSettings.changeSurname(randomElementFromSurnameArray)
        myProfileSettings.save()
        cy.get('#user_name').should('have.value', randomElementFromNameArray)
        cy.get('#user_surname').should('have.value', randomElementFromSurnameArray)
        cy.get('.header__name').should('include.text', randomElementFromNameArray)
        cy.get('.header__name').should('include.text', randomElementFromSurnameArray)
    })
    it('Change Position in profile settings', () => {
        cy.fixture('testProfileDatas')
        const myProfileSettings = new MyProfileSettings()
        let randomElementFromTestPositionArray = testProfileDatas.testPositionArray[Math.floor(Math.random()* testProfileDatas.testPositionArray.length)]
        myProfileSettings.changePosition(randomElementFromTestPositionArray)
        myProfileSettings.save()
        cy.get('#user_jobName').should('have.value', randomElementFromTestPositionArray)
        cy.get('.header__role').should('have.text', randomElementFromTestPositionArray)
    })
    it('Change e-mail then login to system with new data' , () => {
        cy.fixture('testProfileDatas')
        const myProfileSettings = new MyProfileSettings()
        const loginPage = new LoginPage()
        const dashboardPage = new DashboardPage()
        myProfileSettings.changeEmail(credentials.testLogin+'a')
        myProfileSettings.save()
        cy.get('#user_email').should('have.value', credentials.testLogin+'a')
        dashboardPage.clickOnProfileOptions()
        dashboardPage.chooseProfileOption('Wyloguj')
        loginPage.loginToSystem(credentials.testLogin+'a',credentials.testPassword)
        cy.url().should('eq','https://demo1.saleson.pl/dashboard/')
        dashboardPage.clickOnProfileOptions()
        dashboardPage.chooseProfileOption('Mój profil')
        myProfileSettings.changeEmail(credentials.testLogin)           // ClearFunction -> get back to fixture login 
        myProfileSettings.save()
        cy.get('#user_email').should('have.value', credentials.testLogin)
    })
    it('Change password then login to system with new data' , () => {
        cy.fixture('testProfileDatas')
        const myProfileSettings = new MyProfileSettings()
        const loginPage = new LoginPage()
        const dashboardPage = new DashboardPage()
        myProfileSettings.changePassword(credentials.testPassword+'1')
        myProfileSettings.save()
        dashboardPage.clickOnProfileOptions()
        dashboardPage.chooseProfileOption('Wyloguj')
        loginPage.loginToSystem(credentials.testLogin,credentials.testPassword+'1')
        cy.url().should('eq','https://demo1.saleson.pl/dashboard/')
        dashboardPage.clickOnProfileOptions()
        dashboardPage.chooseProfileOption('Mój profil')
        myProfileSettings.changePassword(credentials.testPassword)           // ClearFunction -> get back to fixture Password
        myProfileSettings.save()
    })
    it('Upload Photo' , () => {
        cy.fixture('testProfileDatas')
        const myProfileSettings = new MyProfileSettings()
        myProfileSettings.uploadPhoto('cypress/fixtures/testPhoto.jpg')
        myProfileSettings.save()
    })
  })

  