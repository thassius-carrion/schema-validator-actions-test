/// <reference types="cypress" />

Cypress.Commands.add('inputText', (selector: string, content: string) => {
    cy.get(selector).type(content, { parseSpecialCharSequences: false, delay: 0 })
})

Cypress.Commands.add('selectRoute', (routeName: string) => {
    cy.contains(routeName).click()
})

export {}
declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            inputText(selector: string, content: string): Chainable<void>
            selectRoute(routeName: string): Chainable<void>
        }
    }
}