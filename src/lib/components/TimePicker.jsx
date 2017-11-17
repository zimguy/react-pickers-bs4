import React, {Component} from 'react';

import moment from 'moment';

import TimeSelector from './TimeSelector';
import './Picker.css';

class TimePicker extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.getStateValuesFromProps(props), {isOpen: false});
  }

  getStateValuesFromProps = (props) => {

    // 12 or 24
    const pickerFormat = props.pickerFormat
      ? props.pickerFormat
      : '12';
  
    const displayFormat = props.displayFormat
      ? props.displayFormat
      : pickerFormat === '12'
      ? 'h:mm A'
      : 'HH:mm';

    const returnFormat = props.returnFormat
      ? props.returnFormat
      : 'HH:mm';
    
    const value = props.value ? props.value : null;
    const mom = moment(value, returnFormat);
    const displayValue = value && mom.isValid()
      ? mom.format(displayFormat)
      : value ? value : '';

    return {displayFormat, returnFormat, pickerFormat, value, displayValue, mom};

  }

  componentWillReceiveProps(nextProps) {
    const newState = this.getStateValuesFromProps(nextProps);
    const state = this.state;
    if (newState.displayFormat !== state.displayFormat 
      || newState.returnFormat !== state.returnFormat 
      || newState.pickerFormat !== state.pickerFormat
      || newState.value !== state.value) {
      this.setState(newState);
    }
  }

  toggleLookup = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 27) { // 27 = Escape
      this.toggleLookup();
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
    this.toggleLookup();
  }

  handleClickIcon = () => {
    this.toggleLookup();
  }

  handleTimeSelected = (hh, mm) => {
    const mom = moment({hours:hh, minutes:mm});
    const displayValue = mom.format(this.state.displayFormat);
    const value = mom.format(this.state.returnFormat);
    this.setState({
      value,
      displayValue,
      mom
    }, this.sendOnChange);
  }

  render() {

    const inputSize = this.props.inputSize
      ? this.props.inputSize
      : null;

    const hasError = this.props.error && this.props.error.length > 0;

    const inputClasses = 'form-control' + (inputSize
      ? ' form-control-' + inputSize
      : '') + (hasError
      ? ' is-invalid'
      : '');

    const iconClasses = 'Icon fa fa-clock-o text-muted' + (inputSize
      ? ' ' + inputSize
      : '');

    const placeholder = this.props.placeholder
      ? this.props.placeholder
      : '';

    const {displayValue, mom, isOpen, pickerFormat} = this.state;

    const hh = mom && mom.isValid() ? mom.hour() : 0;
    const mm = mom && mom.isValid() ? mom.minute() : 0;

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
          title="Show/Hide Time Entry"
          onClick={this.handleClick}/> 
          
        {isOpen && <TimeSelector
          hh={hh}
          mm={mm}
          pickerFormat={pickerFormat}
          onChange={this.handleTimeSelected}
          onDismiss={this.toggleLookup}/>}
        
        {hasError && <div className="invalid-feedback">{this.props.error}</div>}

      </div>
    );
  }
}

export default TimePicker;