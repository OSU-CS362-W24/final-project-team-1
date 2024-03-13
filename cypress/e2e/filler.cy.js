it("connets succesfully to the local server", function() {
    cy.visit("/")
})
it("The chart is correctly generated and exists", function() {
    cy.visit("/")
    cy.findByText("Line")
        .click()
    cy.findByText("+")
        .click()
        .click()
        .click()
        .click()
    cy.findByText("Chart title")
        .click()
        .type("Cats vs. Dogs")
    cy.findByText("X label")
        .click()
        .type("Cats")
    cy.findByText("Y label")
        .click()
        .type("Dogs")
    for (let i = 1; i <= 5; i++) {
        cy.get(".x-value").eq(i - 1)
            .click()
            .type(i)
    }
    for (let i = 1; i <= 5; i++) {
        cy.get(".y-value").eq(i - 1)
            .click()
            .type(i)
    }
    cy.findByText("Generate chart")
        .click()
    cy.get("img").should("exist")
})

it("The data is filled out and is the same on other pages", function() {
    cy.visit("/")
    cy.findByText("Line")
        .click()
    cy.findByText("+")
        .click()
        .click()
        .click()
        .click()
    cy.findByText("Chart title")
        .click()
        .type("Cats vs. Dogs")
    cy.findByText("X label")
        .click()
        .type("Cats")
    cy.findByText("Y label")
        .click()
        .type("Dogs")
    for (let i = 1; i <= 5; i++) {
        cy.get(".x-value").eq(i - 1)
            .click()
            .type(i)
    }
    for (let i = 1; i <= 5; i++) {
        cy.get(".y-value").eq(i - 1)
            .click()
            .type(i)
    }
    cy.findByText("Scatter")
        .click()
    for (let i = 1; i <= 5; i++) {
        cy.get(".x-value-input").eq(i - 1).should("have.value", i)
    }
    for (let i = 1; i <= 5; i++) {
        cy.get(".y-value-input").eq(i - 1).should("have.value", i)
    }
    cy.findByText("Bar")
        .click()
    for (let i = 1; i <= 5; i++) {
        cy.get(".x-value-input").eq(i - 1).should("have.value", i)
    }
    for (let i = 1; i <= 5; i++) {
        cy.get(".y-value-input").eq(i - 1).should("have.value", i)
    }
})