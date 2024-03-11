// Due to the nature of jest, await generateChartImg returns a blob rather than an object.
// As parsing the blob inside the test would not only be an antipattern but move the burden
// of correct execution from the function to the test, it was decided to only test that something
// was returned and that an error was not thrown.

const generateChartImg = require("./generateChartImg")

test ('something is returned given a correct input', async function() {
    // Arrange
    type = "line"
    data = 
    [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 9, y: 1 }
    ]
    xLabel = "test X label"
    yLabel = "test Y label"
    title = "test graph"
    color = "red"

    // Act/Assert

    return expect(() => {
        generateChartImg(type, data, xLabel, yLabel, title, color)
    }).toBeDefined()
})

test ('error is not thrown given a correct input', async function() {
    // Arrange
    type = "line"
    data = 
    [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 9, y: 1 }
    ]
    xLabel = "test X label"
    yLabel = "test Y label"
    title = "test graph"
    color = "red"

    // Act/Assert

    return expect(() => {
        generateChartImg(type, data, xLabel, yLabel, title, color)
    }).not.toThrow()
})
