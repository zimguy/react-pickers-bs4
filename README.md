# React Pickers Using Bootstrap 4

A library of widgets for React and Bootstrap based web applications.

Built using <a href="https://github.com/UdiliaInc/create-react-library" target="_blank">Create React Library</a>.

## Getting Started
Add the Pickers library to your app
````
npm install --save react-pickers-bs4
````
Pickers depends on the following packages/libraries which you must install/add manually:
1. <a href="http://momentjs.com/">Moment.js</a>
2. <a href="http://fontawesome.io/">Font Awesome</a>
3. <a href="https://getbootstrap.com/">Bootstrap (v4)</a>

Install Moment.js:
````
npm install --save moment
````
Font Awesome and Bootstrap can be added to your app in several different ways. For example, you could install the appropriate npm packages or you could add links to a CDN in your html page.

## Demo
Clone (or download) this repository, install dependencies and then run the demo:
````
git clone https://github.com/zimguy/react-pickers-bs4.git

cd react-pickers-bs4

npm install

npm start
````
## DatePicker
A wrapper around a text input element that allows the user to type in a date and/or select a date from a calendar pop-up.

![DatePicker](https://raw.githubusercontent.com/zimguy/react-pickers-bs4/master/resources/DatePicker.PNG)

### DatePicker Properties
````jsx
<DatePicker
  displayFormat="MM/DD/YYYY"
  returnFormat="YYYY-MM-DD"
  value={date}
  onChange={this.handleDateChange}
  placeholder="MM/DD/YYYY"
  error={dateError}
  inputSize="lg"
  />
````

#### displayFormat
Format of the date displayed to the user. Defaults to "MM/DD/YYYY".

#### returnFormat
Format of the date returned by the DatePicker. Defaults to "YYYY-MM-DD".

#### value
Value of the date. DatePicker uses Moment to parse the date so it is very flexible in terms of the type and format of the value. However, the value returned by the DatePicker will either be ``null`` or a string (if the value returned is valid then the string will be in *returnFormat*).

#### onChange
Handler invoked when the user enters or selects a date. The handler must accept a javascript object of the form:
````javascript
{
  value: string,
  isValid: boolean,
  hasValue: boolean
}
````
* *value* : null or a string in the 'returnFormat' format. It may or may not be a valid date string.
* *isValid* : true if the value is a valid date string.
* *hasValue*: true if the value is not null.

Note: the onChange handler will be called on each key press.

#### placeHolder
Place holder displayed in the input element.

#### error
Error message to display using Bootstrap validation classes. If this property is non-null and non-empty then DatePicker will add the ``.is-invalid`` class to the input element and also add an ``<invalid-feedback>`` tag. See <a href="https://getbootstrap.com/docs/4./components/forms/#validation">Bootstrap form validation</a> for more details.

#### inputSize
This adds a Bootstrap form-control size modifier to the input element:
* *sm* : Small
* *lg* : Large

Omit this property for standard Bootstrap form-control size.

### Mouse & Keyboard Interaction
DatePicker will toggle the popup calendar when the user clicks on the input element or calendar icon.

The calendar can also be toggled by pressing the ``Esc`` key.

Tabbing (or back-tabbing) out of the input element will automatically close the Calendar.