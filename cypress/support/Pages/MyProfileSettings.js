class MyProfileSettings {
    changeName(testName) {
        cy.get('#user_name').clear().type(testName)
    }
    changeSurname(testSurname) {
        cy.get('#user_surname').clear().type(testSurname)
    }
    changePosition(testPositionElement) {
        cy.get('#user_jobName').clear().type(testPositionElement)
    }
    changeEmail(tempEmail) {
        cy.get('#user_email').clear().type(tempEmail)
    }
    changePassword(testPassword) {
        cy.get('#user_plainPassword_first').clear().type(testPassword)
        cy.get('#user_plainPassword_second').clear().type(testPassword)
    }
    uploadPhoto(testPhoto) {
        cy.get('#user_avatarFile').selectFile(testPhoto)
    }
    save() {
        cy.get('#user_save').click()
    }
}
export default MyProfileSettings