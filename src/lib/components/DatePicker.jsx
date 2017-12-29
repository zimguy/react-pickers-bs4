import React, {Component} from 'react';

import moment from 'moment';

import Calendar from './Calendar';
import './Picker.css';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.activeElement = null;
    this.state = Object.assign(
      this.getStateValuesFromProps(props), 
      {
        isOpen: false
      }
    );
    this._hasFocus = false;
    this._isClicking = false
    this._isMounted = false;
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

  isAutoOpen() {
    return this.props.autoOpen || (typeof this.props.autoOpen === 'undefined');
  }

  isAutoClose() {
    return this.props.autoClose || (typeof this.props.autoClose === 'undefined');
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleCalendar = () => {
    this.setState({ isOpen : !this.state.isOpen });
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 27) { // 27 = Escape
      this.toggleCalendar();
    } else if (this.isAutoClose() && event.keyCode === 9 && this.state.isOpen) { // 9 = Tab
      this.toggleCalendar();
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

  closeOnBlur = () => {
    if (this._isMounted) {
      if (this.state.isOpen && !this._hasFocus) {
        this.setState({ isOpen: false });
      }
    }
  }

  handleBlur = (event) => {
    this._hasFocus = false;
    if (this.isAutoClose()) {
      setTimeout(this.closeOnBlur, 150);
    }
  }

  handleFocus = (event) => {
    this._hasFocus = true;
    if (this._isClicking || (!this.state.isOpen && this.isAutoOpen())) {
      this.toggleCalendar();
      this._isClicking = false;
    }    
  }

  handleInputBlur = (event) => {
    const { mom, displayValue } = this.state;
    if (mom.isValid()) {
      const newDisplayValue = mom.format(this.state.displayFormat);
      if (newDisplayValue !== displayValue) {
        this.setState({displayValue: newDisplayValue});
      }
    };  
  }

  handleClickIcon = () => {
    this._isClicking = true;
    this.textInput.focus();
  }

  handleDateSelected = (date) => {
    const mom = moment(date);
    const displayValue = mom.format(this.state.displayFormat);
    const value = mom.format(this.state.returnFormat);
    this.setState({
      value,
      displayValue,
      mom
    }, this.sendOnChange);
    this.textInput.focus();
    this.toggleCalendar();
  }

  handleCalendarDismiss = () => {
    this.textInput.focus();
    this.toggleCalendar();
  }

  render() {

    const name = this.props.name ? this.props.name : this.props.id ? this.props.id : 'datepicker';
    const id = this.props.id ? this.props.id : name;

    const inputSize = this.props.inputSize
      ? this.props.inputSize
      : null;

    const hasError = this.props.error && this.props.error.length > 0;

    const inputClasses = 'form-control' + (inputSize
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
      <div 
        name={name} id={id} 
        className="Picker" 
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >

        <input
          type="text"
          name={name+'_input'}
          id={id+'_input'}
          className={inputClasses}
          placeholder={placeholder}
          onBlur={this.handleInputBlur}
          onChange={this.handleChange}
          value={displayValue}
          ref={(input) => { this.textInput = input; }} 
        />

        <i
          name={name+'_icon'}
          id={id+'_icon'}
          className={iconClasses}
          title="Show/Hide Calendar"
          onClick={this.handleClickIcon}/> 
          
        {isOpen && <Calendar
          name={name}
          id={id}
          selectedMoment={mom}
          onDateSelected={this.handleDateSelected}
          onDismiss={this.handleCalendarDismiss}/>}

        {hasError && <div className="invalid-feedback">{this.props.error}</div>}

      </div>
    );
  }
}

export default DatePicker;