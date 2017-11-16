import React, {Component} from 'react';

import moment from 'moment';

import 'font-awesome/css/font-awesome.min.css'

import Calendar from './Calendar';
import './Picker.css';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.getStateValuesFromProps(props), {isOpen: false});
  }

  getStateValuesFromProps = (props) => {

    const displayFormat = props.displayFormat
      ? props.displayFormat
      : 'MM/DD/YYYY';

    const returnFormat = props.returnFormat
      ? props.returnFormat
      : 'YYYY-MM-DD';
    
    const value = props.value ? props.value : null;
    const mom = moment(value, returnFormat);
    const displayValue = value && mom.isValid()
      ? mom.format(displayFormat)
      : value ? value : '';

    return {displayFormat, returnFormat, value, displayValue, mom};

  }

  componentWillReceiveProps(nextProps) {
    const newState = this.getStateValuesFromProps(nextProps);
    const state = this.state;
    if (newState.displayFormat !== state.displayFormat || newState.returnFormat !== state.returnFormat || newState.value !== state.value) {
      this.setState(newState);
    }
  }

  toggleCalendar = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 27) { // 27 = Escape
      this.toggleCalendar();
    } else if (event.keyCode === 9) { // 9 = Tab
      this.setState({isOpen: false})
    }
  }

  sendOnChange = () => {
    if (this.props.onChange) {
      const { mom, value } = this.state;
      const struc = {
        hasValue: value ? true : false,
        isValid: mom.isValid(),
        value: value
      };
      this
        .props
        .onChange(struc);
    }
  }

  handleChange = (event) => {

    const displayValue = event.target.value;
    const mom = moment(displayValue, this.state.displayFormat);
    const value = displayValue.length === 0
      ? null
      : mom.isValid() ? mom.format(this.state.returnFormat) : displayValue;

    this.setState({
      value,
      displayValue,
      mom
    }, this.sendOnChange);

  }

  handleInputBlur = () => {
    const { mom, displayValue } = this.state;
    if (mom.isValid()) {
      const newDisplayValue = mom.format(this.state.displayFormat);
      if (newDisplayValue !== displayValue) {
        this.setState({displayValue: newDisplayValue});
      }
    };
  }

  handleClick = () => {
    this.toggleCalendar();
  }

  handleClickIcon = () => {
    this.toggleCalendar();
  }

  handleDateSelected = (date) => {
    const mom = moment(date);
    const displayValue = mom.format(this.state.displayFormat);
    const value = mom.format(this.state.returnFormat);
    const isOpen = false;
    this.setState({
      value,
      displayValue,
      mom,
      isOpen
    }, this.sendOnChange);
  }

  render() {

    const inputSize = this.props.inputSize
      ? this.props.inputSize
      : null;

    const hasError = this.props.error && this.props.error.length > 0;

    const inputClasses = 'TextInput form-control' + (inputSize
      ? ' form-control-' + inputSize
      : '') + (hasError
      ? ' is-invalid'
      : '');

    const iconClasses = 'Icon fa fa-calendar-o text-muted' + (inputSize
      ? ' ' + inputSize
      : '');

    const placeholder = this.props.placeholder
      ? this.props.placeholder
      : '';

    const {displayValue, mom, isOpen} = this.state;

    return (
      <div className="Picker" onKeyDown={this.handleKeyDown}>

        <input
          type="text"
          className={inputClasses}
          placeholder={placeholder}
          onBlur={this.handleInputBlur}
          onChange={this.handleChange}
          onClick={this.handleClick}
          value={displayValue}/>

        <i
          className={iconClasses}
          title="Show/Hide Calendar"
          onClick={this.handleClick}/> 
          
        {isOpen && <Calendar
          selectedMoment={mom}
          onDateSelected={this.handleDateSelected}
          onDismiss={this.toggleCalendar}/>}

        {hasError && <div className="invalid-feedback">{this.props.error}</div>}

      </div>
    );
  }
}

export default DatePicker;