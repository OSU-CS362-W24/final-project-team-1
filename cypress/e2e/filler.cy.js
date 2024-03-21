// This file holds the first half of the e2e tests required
// in the assignment description:
// 
// - the test for chart is correctly generated
// 
// - the test for chart data is maintained across pages

it("connets succesfully to the local server", function() {
    cy.visit("/")
})
it("The chart is correctly generated and exists", function() {
    cy.visit("/")
    cy.findByText("Line")
        .click()
        //Adds 4 new point entries
    cy.findByText("+")
        .click()
        .click()
        .click()
        .click()
        //Goes into the chart title box and types Cats vs Dogs
    cy.findByText("Chart title")
        .click()
        .type("Cats vs. Dogs")
        //Goes into the X label and types Cats
    cy.findByText("X label")
        .click()
        .type("Cats")
        //Goes into the Y label and types Dogs
    cy.findByText("Y label")
        .click()
        .type("Dogs")
        //loops through the 5 point entries and puts x values into them
    for (let i = 1; i <= 5; i++) {
        cy.get(".x-value").eq(i - 1)
            .click()
            .type(i)
    }
    //loops through the 5 point entries and puts y values into them
    for (let i = 1; i <= 5; i++) {
        cy.get(".y-value").eq(i - 1)
            .click()
            .type(i)
    }
    cy.findByText("Generate chart")
        .click()
        //As per the instructions we only need to check that the img exists
    cy.get("img").should("exist")
})

it("The data is filled out and is the same on other pages", function() {
    cy.visit("/")
    cy.findByText("Line")
        .click()
        //Adds 4 new point entries
    cy.findByText("+")
        .click()
        .click()
        .click()
        .click()
        //Goes into the chart title box and types Cats vs Dogs
    cy.findByText("Chart title")
        .click()
        .type("Cats vs. Dogs")
        //Goes into the X label and types Cats
    cy.findByText("X label")
        .click()
        .type("Cats")
        //Goes into the Y label and types Dogs
    cy.findByText("Y label")
        .click()
        .type("Dogs")
        //loops through the 5 point entries and puts x values into them
    for (let i = 1; i <= 5; i++) {
        cy.get(".x-value").eq(i - 1)
            .click()
            .type(i)
    }
    //loops through the 5 point entries and puts y values into them
    for (let i = 1; i <= 5; i++) {
        cy.get(".y-value").eq(i - 1)
            .click()
            .type(i)
    }
    cy.findByText("Scatter")
        .click()
        //loops through the x inputs and ensures the values are correct scatter graph
    for (let i = 1; i <= 5; i++) {
        cy.get(".x-value-input").eq(i - 1).should("have.value", i)
    }
    //loops through the y inputs and ensures the values are correct on the scatter graph
    for (let i = 1; i <= 5; i++) {
        cy.get(".y-value-input").eq(i - 1).should("have.value", i)

    }
    cy.findByText("Bar")
        .click()
        //loops through the x inputs and ensures the values are correct bar graph
    for (let i = 1; i <= 5; i++) {
        cy.get(".x-value-input").eq(i - 1).should("have.value", i)
    }
    //loops through the y inputs and ensures the values are correct on the bar graph
    for (let i = 1; i <= 5; i++) {
        cy.get(".y-value-input").eq(i - 1).should("have.value", i)
    }
})