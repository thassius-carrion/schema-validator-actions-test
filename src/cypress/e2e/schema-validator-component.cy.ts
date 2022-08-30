import { default as merchantSample } from "../fixtures/merchant.json"

describe("Schema Validator - Functional Tests", () => {
    const NO_ERROR_MESSAGE: string = 'No errors found. JSON validates against the schema.'
    const JSON_MESSAGE_ERROR: string = 'Error parsing JSON. JSON data is incomplete.'

    let cyRoutes: string = '[data-cy="routes"]'
    let cyTextArea: string = '[data-cy="json-area"]'
    let cySubmitButton: string = '[data-cy="submit"]'

    let requestRadioButton: string = '#mat-radio-2'
    let responseRadioButton: string = '#mat-radio-3'
    let classResult = ".result"

    const MERCHANT_ROUTE: string = '/v1/merchant'

    const ERROR_TEXT_AREA: string = "Please inform the JSON you want to validade"
    const ERROR_SELECT_OPTION: string = "Please choose a route"

    let toInputInMerchantSchema: string

    before(() => {
        toInputInMerchantSchema = JSON.stringify(merchantSample, null, "\t")
    })

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
    });

    it("Should input the correct json and return success message", () => {
        cy.get(cyRoutes)
            .click()
            .selectRoute(MERCHANT_ROUTE)
        cy.inputText(cyTextArea, toInputInMerchantSchema)
        cy.get(cySubmitButton)
            .click()
        cy.get(classResult)
            .contains(NO_ERROR_MESSAGE)
            .should("exist")
    })

    it("Should check if exist error when route is not selected ", () => {
        cy.get(cyRoutes)
            .focus()
            .blur()
        cy.contains(ERROR_SELECT_OPTION)
            .should("exist")
    })

    it("Should check if exist error when json is not inputed", () => {
        cy.get(cyTextArea)
            .focus()
            .blur()
        cy.contains(ERROR_TEXT_AREA)
            .should("exist")
    })

    it("Should check changes in submit button", () => {
        const VALID_JSON: string = '{}'
        cy.get(cySubmitButton)
            .and("be.disabled")
        cy.get(cyRoutes)
            .click()
            .selectRoute(MERCHANT_ROUTE)
        cy.inputText(cyTextArea, VALID_JSON)
        cy.get(cySubmitButton)
            .and("not.be.disabled")
    })

    it("Should input the invalid json and return invalid json message", () => {
        const INVALID_JSON: string = "{2w12"
        cy.get(cyRoutes)
            .click()
            .selectRoute(MERCHANT_ROUTE)
        cy.inputText(cyTextArea, INVALID_JSON)
        cy.get(cySubmitButton)
            .click()

        cy.get(classResult)
            .contains(JSON_MESSAGE_ERROR)
            .should("exist")
    })

    it("Should check changes in radio buttons", () => {
        const materialClassRadioButtonIsChecked: string = "mat-radio-checked"
        cy.get(responseRadioButton)
            .as("responseButton")
            .should("have.class", materialClassRadioButtonIsChecked)

        cy.get(requestRadioButton)
            .should("not.have.class", materialClassRadioButtonIsChecked)
            .click()
            .and("have.class", materialClassRadioButtonIsChecked)

        cy.get("@responseButton")
            .and("not.have.class", materialClassRadioButtonIsChecked)
    })

})