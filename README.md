# React Pickers Using Bootstrap 4 v0.24

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
  name="myDatePicker"
  id="myDatePicker"
  displayFormat="MM/DD/YYYY"
  returnFormat="YYYY-MM-DD"
  value={date}
  onChange={this.handleDateChange}
  placeholder="MM/DD/YYYY"
  error={dateError}
  inputSize="lg"
  autoOpen
  autoClose
  />
````
#### name
Name assigned to the outer html div containing the DatePicker. Defaults to "DatePicker". The following sub-controls will be given the same name as the name of the main div with an appropriate suffix. For example:
````html
<div name="myDatePicker" id="myDatePicker" class="Picker">
  <input type="text" name="myDatePicker_input" id="myDatePicker_input">
  <i name="myDatePicker_icon" id="myDatePicker_icon"></i>
  <div name="myDatePicker_calendar" id="myDatePicker_calendar">
  ...
  </div>
</div>
````
#### id
Id assigned to the outer html div containing the DatePicker. If not specified then id will be the same as name *name*.

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

#### autoOpen
Automatically open the Calendar when the DatePicker gets focus. Defaults to *true*.

#### autoClose
Automatically close the Calendar when the DatePicker loses focus. Defaults to *true*.

### Mouse & Keyboard Interaction
DatePicker will toggle the popup calendar when the user clicks on the input element or calendar icon.

The calendar can also be toggled by pressing the ``Esc`` key.

Tabbing (or back-tabbing) out of the input element will automatically close the Calendar.

## TimePicker
A wrapper around a text input element that allows the user to type in a time and/or select a time from a simple pop-up.

![TimePicker](https://raw.githubusercontent.com/zimguy/react-pickers-bs4/master/resources/TimePicker.PNG)

### TimePicker Properties
````jsx
<TimePicker
  name="myTimePicker"
  id="myTimePicker"
  pickerFormat="12"
  displayFormat="h:mm A"
  returnFormat="HH:mm"
  value={time}
  onChange={this.handleTimeChange}
  placeholder="HH:MM AM/PM"
  error={timeError}
  inputSize="lg"
  />
````
#### name
Name assigned to the outer html div containing the TimePicker. Defaults to "TimePicker". The following sub-controls will be given the same name as the name of the main div with an appropriate suffix. For example:
````html
<div name="myTimePicker" id="myTimePicker" class="Picker">
  <input type="text" name="myTimePicker_input" id="myTimePicker_input">
  <i name="myTimePicker_icon" id="myTimePicker_icon"></i>
  <div name="myTimePicker_selector" id="myTimePicker_selector">
  ...
  </div>
</div>
````
#### id
Id assigned to the outer html div containing the DatePicker. If not specified then id will be the same as name *name*.
#### pickerFormat
One of ``"12"`` or ``"24"``. In 12-hour mode TimePicker will allow user to select AM or PM. Defaults to ``"12"``.

#### displayFormat
Format of the time displayed to the user. Defaults to "H:mm A" for 12-hour picker and "HH:mm" for 24-hour picker.

#### returnFormat
Format of the time returned by TimePicker. Defaults to "HH:mm".

#### value
Value of the time. TimePicker uses Moment to parse the time so it is very flexible in terms of the type and format of the value. However, the value returned by TimePicker will either be ``null`` or a string (if the value returned is valid then the string will be in *returnFormat*).

#### onChange
Handler invoked when the user enters or selects a time. The handler must accept a javascript object of the form:
````javascript
{
  value: string,
  isValid: boolean,
  hasValue: boolean
}
````
* *value* : null or a string in the 'returnFormat' format. It may or may not be a valid time string.
* *isValid* : true if the value is a valid time string.
* *hasValue*: true if the value is not null.

Note: the onChange handler will be called on each key press.

#### placeHolder
Place holder displayed in the input element.

#### error
Error message to display using Bootstrap validation classes. If this property is non-null and non-empty then TimePicker will add the ``.is-invalid`` class to the input element and also add an ``<invalid-feedback>`` tag. See <a href="https://getbootstrap.com/docs/4./components/forms/#validation">Bootstrap form validation</a> for more details.

#### inputSize
This adds a Bootstrap form-control size modifier to the input element:
* *sm* : Small
* *lg* : Large

Omit this property for standard Bootstrap form-control size.

#### autoOpen
Automatically open the lookup when the TimePicker gets focus. Defaults to *true*.

#### autoClose
Automatically close the lookup when the TimePicker loses focus. Defaults to *true*.


### Mouse & Keyboard Interaction
TimePicker will toggle the time picker popup when the user clicks on the input element or clock icon.

The pop-up can also be toggled by pressing the ``Esc`` key.

Tabbing (or back-tabbing) out of the input element will automatically close the pop-up.