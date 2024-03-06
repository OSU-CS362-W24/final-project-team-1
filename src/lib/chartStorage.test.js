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
    expect(JSON.parse(result)).not.toEqual([])

    // Clears the chart storage
    window.localStorage.clear()
})

test ('whether correct chart is saved with saveChart', function() {
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

    // Clears the chart storage
    window.localStorage.clear()
})

test ('whether all saved charts are found with loadAllSavedCharts', function() {
    // Arrange
    const chart1 = {
        type: 'bar',
        data: {
            labels: ['F','D','C','B','A'],
            datasets: [{
                label: 'Students',
                data: [10,20,30,40,30]
            }]
        }
    }

    const chart2 = {
        type: 'line',
        data: {
            labels: ['F','D','C','B','A'],
            datasets: [{
                label: 'Students',
                data: [10,20,30,40,30]
            }]
        }
    }

    const chart3 = {
        type: 'scatter',
        data: {
            labels: ['F','D','C','B','A'],
            datasets: [{
                label: 'Students',
                data: [10,20,30,40,30]
            }]
        }
    }

    // Act
    chartStorage.saveChart(chart1)
    chartStorage.saveChart(chart2)
    chartStorage.saveChart(chart3)
    result = chartStorage.loadAllSavedCharts()

    // Assert
    expect(result).toHaveLength(3)
    expect(result[0]).toStrictEqual(chart1)
    expect(result[1]).toStrictEqual(chart2)
    expect(result[2]).toStrictEqual(chart3)

    // Clears the chart storage
    window.localStorage.clear()
})

test ('whether loadSavedChart loads the correct chart', function() {
    // Arrange
    const chart1 = {
        type: 'bar',
        data: {
            labels: ['F','D','C','B','A'],
            datasets: [{
                label: 'Students',
                data: [10,20,30,40,30]
            }]
        }
    }

    const chart2 = {
        type: 'line',
        data: {
            labels: ['F','D','C','B','A'],
            datasets: [{
                label: 'Students',
                data: [10,20,30,40,30]
            }]
        }
    }

    const chart3 = {
        type: 'scatter',
        data: {
            labels: ['F','D','C','B','A'],
            datasets: [{
                label: 'Students',
                data: [10,20,30,40,30]
            }]
        }
    }

    // Act
    chartStorage.saveChart(chart1)
    chartStorage.saveChart(chart2)
    chartStorage.saveChart(chart3)
    result = chartStorage.loadSavedChart(1)

    // Assert
    expect(result).toStrictEqual(chart2)

    // Clears the chart storage
    window.localStorage.clear()
})

test ('whether current chart data is updated with currentChartData', function() {
    // Arrange
    const chartData = {
        type: 'bar',
        data: {
            labels: ['F','D','C','B','A'],
            datasets: [{
                label: 'Students',
                data: [10,20,30,40,30]
            }]
        }
    }

    const updatedChartData = {
        type: 'line',
        data: {
            labels: ['A','B','C','D','F'],
            datasets: [{
                label: 'Students',
                data: [30,40,30,20,10]
            }]
        }
    }

    // Act
    window.localStorage.setItem("currentChartData", JSON.stringify(chartData))
    chartStorage.updateCurrentChartData(updatedChartData)
    result = JSON.parse(window.localStorage.getItem("currentChartData"))

    // Assert
    expect(result).toStrictEqual(
        updatedChartData
    )

    // Clears the chart storage
    window.localStorage.clear()
})

test ('whether current chart data is provided by loadCurrent', function() {
    // Arrange
    const chartData = {
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
    window.localStorage.setItem("currentChartData", JSON.stringify(chartData))
    result = chartStorage.loadCurrentChartData()

    // Assert
    expect(result).toStrictEqual(
        chartData
    )

    // Clears the chart storage
    window.localStorage.clear()
})
