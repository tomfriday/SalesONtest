class DashboardPage {
    clickOnProfileOptions() { 
        cy.get('.header__toggle__arrow').click()
    }
    chooseProfileOption(tab) {
        cy.get('.header-dropdown').contains(tab).click()
    }
}
export default DashboardPage