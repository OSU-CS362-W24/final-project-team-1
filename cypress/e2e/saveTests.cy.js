
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