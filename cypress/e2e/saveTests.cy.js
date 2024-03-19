// This file holds the latter half of the e2e tests required
// in the assignment description:
// 
// - the test for saving a chart to the "gallery"
// 
// - the test for re-opening a saved chart


it('test for saving a chart to the gallery', () => {
    cy.visit('/')

    // makes a line chart. function params: title, x-values, y-values
    cy.makeLineChart("Cats vs. Dogs", [1, 2, 3, 4, 5], [3, 7, 15, 25, 40])

    // save and go to gallery
    cy.findByText("Save chart").click()
    cy.findByText("Gallery").click()

    // assertions
    cy.findByText("Cats vs. Dogs").should("exist")
})

it('test for re-opening a saved chart', () => {
    cy.visit('/')

    // makes a line chart. function params: title, x-values, y-values
    const x = [1, 2, 3, 4, 5]
    const y = [3, 7, 15, 25, 40]
    cy.makeLineChart("Cats vs. Dogs", x, y)

    // save and go to gallery
    cy.findByText("Save chart").click()
    cy.findByText("Gallery").click()

    // go to the chart that was saved
    cy.findByText("Cats vs. Dogs").click()

    // assert graph is there
    cy.findByRole("img").should("exist")

    // assert that the original values exist and are unchanged
    for (let i = 0; i < 5; i++) {
        cy.get(`:nth-child(${4 + 2*i}) >.x-value-input`).should("have.value", `${x[i]}`)
        cy.get(`:nth-child(${5 + 2*i}) >.y-value-input`).should("have.value", `${y[i]}`)
    }
    
})