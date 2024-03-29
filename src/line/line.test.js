/**
* @jest-environment jsdom
*/
// const chartBuilder = require("../chartBuilder/chartBuilder.js")
const sortPoints = require("../lib/sortPoints.js")
const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	require(jsPath)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



describe('UI tests', () => {
    // reset the DOM after each test and restore all mocks/spies
    beforeEach(() => {
        jest.resetModules()
    })
    afterEach(() => {
        // However, there's one other very important detail:
        jest.restoreAllMocks();
        window.localStorage.clear(); // piazza recommended for clearing DOM Data
    })

    // have to test this first cause we need to clear the JSDOM elements using this function
    // or else stored data persists throughout different tests
    test('clearing the chart data works', async function () {
        
        // arrange
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
        const clearChartDataBtn = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})
        var X_input_1 = domTesting.getAllByLabelText(document, 'X', {exact: true})[0]
        var Y_input_1 = domTesting.getAllByLabelText(document, 'Y', {exact: true})[0]
        const newUser = userEvent.setup()

        // act
        await newUser.type(X_input_1, '1')
        await newUser.type(Y_input_1, '2')
        
        // assert
        expect(X_input_1.value).toBe('1')
        expect(Y_input_1.value).toBe('2')

        // act 
        await newUser.click(clearChartDataBtn)

        X_input_1 = domTesting.getAllByLabelText(document, 'X', {exact: true})[0]
        Y_input_1 = domTesting.getAllByLabelText(document, 'Y', {exact: true})[0]

        // assert
        expect(X_input_1.value).toBe('')
        expect(Y_input_1.value).toBe('')
    })

    test('adding values into the input fields', async function () {
        // arrange 
        
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
        const clearChartDataBtn = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})
        const X_input_1 = domTesting.getAllByLabelText(document, 'X', {exact: true})[0]
        const Y_input_1 = domTesting.getAllByLabelText(document, 'Y', {exact: true})[0]
        const addValue = domTesting.getByRole(document, 'button', {name: '+'})
        const newUser = userEvent.setup()

        // act
        await newUser.type(X_input_1, '1')
        await newUser.type(Y_input_1, '2')
        await newUser.click(addValue)

        var X_inputs = domTesting.getAllByLabelText(document, 'X', {exact: true})
        var Y_inputs = domTesting.getAllByLabelText(document, 'Y', {exact: true})

        // assert
        expect(X_inputs[0].value).toBe('1')
        expect(Y_inputs[0].value).toBe('2')

        const X_input_2 = domTesting.getAllByLabelText(document, 'X', {exact: true})[1]
        const Y_input_2 = domTesting.getAllByLabelText(document, 'Y', {exact: true})[1]
        // act
        await newUser.type(X_input_2, '3')
        await newUser.type(Y_input_2, '4')
        await newUser.click(addValue)

        const X_input_3 = domTesting.getAllByLabelText(document, 'X', {exact: true})[2]
        const Y_input_3 = domTesting.getAllByLabelText(document, 'Y', {exact: true})[2]

        await newUser.type(X_input_3, '5')
        await newUser.type(Y_input_3, '6')
        await newUser.click(addValue)
        await newUser.click(addValue)
        await newUser.click(addValue)
        await newUser.click(addValue)

        // assert
        X_inputs = domTesting.getAllByLabelText(document, 'X', {exact: true})
        Y_inputs = domTesting.getAllByLabelText(document, 'Y', {exact: true})


        // verify all values are correct and add value button adds new boxes
        expect(X_inputs[0].value).toBe('1')
        expect(Y_inputs[0].value).toBe('2')
        expect(X_inputs[1].value).toBe('3')
        expect(Y_inputs[1].value).toBe('4')
        expect(X_inputs[2].value).toBe('5')
        expect(Y_inputs[2].value).toBe('6')
        expect(X_inputs.length).toBe(7)
        expect(Y_inputs.length).toBe(7)
        // await newUser.click(clearChartDataBtn) - don't need this since afterEach() f(x)

    })

    test('browser sends alert when no data entered', async function () {
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
        const clearChartDataBtn = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})
        const generateChartButton = domTesting.getByRole(document, 'button', {name: 'Generate chart'})
        const newUser = userEvent.setup()

        // create a spy for the alert method of the window object
        const alertSpy = jest.spyOn(window, "alert").mockImplementation(async function() {})
        await newUser.click(generateChartButton)

        // assert the error message from the spy
        expect(alertSpy).toHaveBeenCalledWith("Error: No data specified!")
        // await newUser.click(clearChartDataBtn) - don't need this since afterEach() f(x)
    })

    test('clear chart data works', async function () {
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
        const clearChartDataBtn = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})
        const newUser = userEvent.setup()
        const addValue = domTesting.getByRole(document, 'button', {name: '+'})
        const X_label = domTesting.getByLabelText(document, 'X label', {exact: true})
        const Y_label = domTesting.getByLabelText(document, 'Y label', {exact: true})
        const chart_title = domTesting.getByLabelText(document, 'Chart title', {exact: true})
        const colorBtn = domTesting.getByLabelText(document, "Chart color", {exact: true})

        // await newUser.click(clearChartDataBtn)

        // await newUser.type(colorBtn, "#646464")
        
        // ONLY WAY WE FOUND TO CHANGE THE COLOR INPUT!!! - shoutout elliot
        // TAB OR TYPING OR MOVING CURSOR DOESN'T WORK TO ACCESS
        // identified issue and here's github solution: https://github.com/testing-library/user-event/issues/423
        
        // act
        await domTesting.fireEvent.input(colorBtn, {target: {value: '#646464'}})

        await newUser.type(X_label, "cats")
        await newUser.type(Y_label, "dogs")
        await newUser.type(chart_title, "this_is_chart_title")
        
        await newUser.click(addValue)
        await newUser.click(addValue)
        await newUser.click(addValue)
        await newUser.click(addValue)
        await newUser.click(addValue)
        
        var X_inputs = domTesting.getAllByLabelText(document, 'X', {exact: true})
        var Y_inputs = domTesting.getAllByLabelText(document, 'Y', {exact: true})

        
        for (let i = 0; i < X_inputs.length; i++) {
            await newUser.type(X_inputs[i], "20")
            await newUser.type(Y_inputs[i], "20")
        }

        X_inputs = domTesting.getAllByLabelText(document, 'X', {exact: true})
        Y_inputs = domTesting.getAllByLabelText(document, 'Y', {exact: true})

        let j = 0
        // there is data there
        for (; j < X_inputs.length; j++) {
            expect(X_inputs[j].value).toBe('20')
            expect(Y_inputs[j].value).toBe('20')
        }
        expect(X_inputs.length).toBe(6)
        expect(Y_inputs.length).toBe(6)

        // label fields are FILLED
        expect(X_label.value).toBe('cats')
        expect(Y_label.value).toBe('dogs')
        expect(chart_title.value).toBe('this_is_chart_title')

        // chart color is changed
        var color = colorBtn.value
        expect(color).toBe("#646464")

        // CLEAR THE DATA
        await newUser.click(clearChartDataBtn)

        // assert! 

        X_inputs = domTesting.getAllByLabelText(document, 'X', {exact: true})
        Y_inputs = domTesting.getAllByLabelText(document, 'Y', {exact: true})

        // cleared data
        expect(X_inputs[0].value).toBe('')
        expect(Y_inputs[0].value).toBe('')

        // removed additional value fields
        expect(X_inputs.length).toBe(1)
        expect(Y_inputs.length).toBe(1)

        // label fields are empty
        expect(X_label.value).toBe('')
        expect(Y_label.value).toBe('')
        expect(chart_title.value).toBe('')

        // chart color is back to default
        color = colorBtn.value
        expect(color).toBe("#ff4500")

    })

    test('data for generateChartImg() is correctly sent', async function() {
        jest.mock("../lib/generateChartImg.js")
        const generateChartImgSpy = require("../lib/generateChartImg.js")
        

        // arrange
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
        const colorBtn = domTesting.getByLabelText(document, "Chart color", {exact: true})
        const clearChartDataBtn = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})
        const generateChartButton = domTesting.getByRole(document, 'button', {name: 'Generate chart'})
        const newUser = userEvent.setup()
        const addValue = domTesting.getByRole(document, 'button', {name: '+'})
        const X_label = domTesting.getByLabelText(document, 'X label', {exact: true})
        const Y_label = domTesting.getByLabelText(document, 'Y label', {exact: true})
        const chart_title = domTesting.getByLabelText(document, 'Chart title', {exact: true})
        var retURL = ""
        
        // act
        await newUser.type(X_label, "cats")
        await newUser.type(Y_label, "dogs")
        await newUser.type(chart_title, "cats vs dogs")
        
        await newUser.click(addValue)
        await newUser.click(addValue)
        await newUser.click(addValue)
        await newUser.click(addValue)
        await newUser.click(addValue)
        
        var X_inputs = domTesting.getAllByLabelText(document, 'X', {exact: true})
        var Y_inputs = domTesting.getAllByLabelText(document, 'Y', {exact: true})

        
        for (let i = 0; i < X_inputs.length; i++) {
            await newUser.type(X_inputs[i], "20")
            await newUser.type(Y_inputs[i], "20")
        }

        X_inputs = domTesting.getAllByLabelText(document, 'X', {exact: true})
        Y_inputs = domTesting.getAllByLabelText(document, 'Y', {exact: true})
        
        // to create the data block in same fashion as '../chartBuilder/chartBuilder.js:258' !dry
        const data = []
        for (let i = 0; i < X_inputs.length || 0; i++) {
            const x = X_inputs[i].value.trim()
            const y = Y_inputs[i].value.trim()
            if (x || y) {
                data.push({
                    x: x,
                    y: y
                })
            }
        }
        
        
        generateChartImgSpy.mockImplementation(() => {})
        // generate type parameters: type, data, xLabel, yLabel, title, color
        await newUser.click(generateChartButton)
        
        expect(generateChartImgSpy).toHaveBeenCalledWith("line", data, X_label.value, Y_label.value, chart_title.value, colorBtn.value)
    })


})

