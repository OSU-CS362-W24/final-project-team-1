/**
* @jest-environment jsdom
*/
const chartBuilder = require("../chartBuilder/chartBuilder.js")
const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	jest.isolateModules(function() {
		require(jsPath)
	})
}

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe('UI tests', () => {
    test('adding values into the input fields', async function () {
        // arrange 
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
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

    })
    test('browser sends alert when no data entered', async function () {
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
        const generateChartButton = domTesting.getByRole(document, 'button', {name: 'Generate chart'})
        const newUser = userEvent.setup()

        // create a spy for the alert method of the window object
        const alertSpy = jest.spyOn(window, "alert").mockImplementation(async function() {})
        await newUser.click(generateChartButton)
        
        // assert the error message!
        expect(alertSpy).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!")

    })
})