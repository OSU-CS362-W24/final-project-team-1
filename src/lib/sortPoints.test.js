const sortPoints = require("./sortPoints")

test ('an input of one point returns same point', function() {
    // Arrange
    const points = 
    [
        { x: 1, y: 1 }
    ]

    // Act
    const result = sortPoints(points)

    // Assert
    expect(result).toStrictEqual(
        [
            { x: 1, y: 1 }
        ]
    )

})

test ('sorts unsorted list by x value, in ascending order', function() {
    // Arrange
    const points = 
    [
        { x: 2, y: 1 },
        { x: 1, y: 1 },
        { x: 5, y: 1 },
        { x: 9, y: 1 },
        { x: 3, y: 1 }
    ]

    // Act
    const result = sortPoints(points)

    // Assert
    expect(result).toStrictEqual(
        [
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 5, y: 1 },
            { x: 9, y: 1 }
        ]
    )

})

