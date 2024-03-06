/**
* @jest-environment jsdom
*/

const chartStorage = require("./chartStorage")

test ('whether charts are saved with saveChart', function() {
    // Arrange
    const chart = {
        type: 'bar',
        data: {
            labels: ['F','D','C','B','A'],
            datasets: [{
                label: 'Students',
                data: [10,20,30,40,30]
            }]
        }
    }

    // Act
    chartStorage.saveChart(chart)
    result = window.localStorage.getItem("savedCharts")

    // Assert
    expect(JSON.parse(result)[0]).toStrictEqual(
        chart
    )

})