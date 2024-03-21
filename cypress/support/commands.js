// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require("@testing-library/cypress/add-commands")

Cypress.Commands.add("makeLineChart", function (title, x, y) {
    // navigate to the line chart page
    cy.findByText("Line").click()

    // enter in chart title
    cy.findByLabelText("Chart title").type(title)

    // enter in axis labels
    cy.findByLabelText("X label").type("Cats")
    cy.findByLabelText("Y label").type("Dogs")

    // enter in data points
    for (let i = 0; i < 5; i++) {
        cy.findByText("+").click()

        // input value into input fields
        cy.get(`:nth-child(${4 + 2*i}) >.x-value-input`).type(x[i])
        cy.get(`:nth-child(${5 + 2*i}) >.y-value-input`).type(y[i])
    }

    cy.findByText("Generate chart").click()
})