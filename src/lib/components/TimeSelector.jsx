import React, {Component} from 'react';

import './TimeSelector.css';

const EventListenerMode = {capture: true};

const padZero = (num) => {
  let s = '0' + num;
  return s.substr(s.length - 2);
}

class Incrementor extends Component {
  constructor(props) {
    super(props);
    this.mouseDownMode = 0;
    this.isFirstTime = false;
    this.interval = null;
  }

  preventGlobalMouseEvents = () => {
    document.body.style['pointer-events'] = 'none';
  }
  
  restoreGlobalMouseEvents = () => {
    document.body.style['pointer-events'] = 'auto';
  }
  
  mouseupListener = (e) => {
    console.log(this);
    clearInterval(this.interval);
    if (this.isFirstTime) {
      // single click!
      this.props.onChange(this.mouseDownMode);
    }
    this.mouseDownMode = 0;
    console.log('stop capturing', this.mouseDownMode);
    this.restoreGlobalMouseEvents ();
    document.removeEventListener ('mouseup',   this.mouseupListener,   EventListenerMode);
    e.stopPropagation ();
  }
  
  captureMouseEvents (e) {
    console.log('capturing', this.mouseDownMode);
    this.isFirstTime = true;
    const that = this;
    this.interval = setInterval(() => {
      that.props.onChange(this.mouseDownMode);
      that.isFirstTime = false;
    }, 120);
    this.preventGlobalMouseEvents ();
    document.addEventListener ('mouseup', this.mouseupListener,   EventListenerMode);
  }

  startInc = (e) => {
    this.mouseDownMode = 1;
    this.captureMouseEvents(e);
  }

  startDec = (e) => {
    this.mouseDownMode = -1;
    this.captureMouseEvents(e);
  }

  render() {
    return (
      <div className="Incrementor border-secondary">
        <button name="inc" type="button" className="btn btn-sm btn-outline-secondary border-0" onMouseDown={this.startInc}>
          <i className="fa fa-chevron-up"/>
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary border-0" onMouseDown={this.startDec}>
          <i name="dec" className="fa fa-chevron-down"/>
        </button>
      </div>
    )
  }
}

const HourSelector = ({ pickerFormat, value, onChange }) => {
  
  const onIncDec = (amount) => {
    let newValue = value + amount;
    if (newValue < 0) newValue = 23;
    if (newValue > 23) newValue = 0
    onChange(newValue);
  }

  const val = pickerFormat === '12' && value > 12 ? value % 12 : value;
  const displayValue = pickerFormat === '24' ? padZero(value) : val;

  return (    
    <div className="Selector border border-secondary rounded">
      <div className="Number text-secondary">
        {displayValue}
      </div>
      <Incrementor onChange={onIncDec} />
    </div>
  )
}

const MinuteSelector = ({ value, onChange }) => {

  const onIncDec = (amount) => {
    let newValue = value + amount;
    if (newValue > 59) {
      newValue = 0;
    } else if (newValue < 0) {
      newValue = 59;
    };
    onChange(newValue);  
  }

  const displayValue = padZero(value);

  return (
    <div className="Selector border border-secondary rounded">
      <div className="Number text-secondary">
        {displayValue}
      </div>
      <Incrementor onChange={onIncDec} />
    </div>
  )
}

const AmPmSelector = ({value, onChange }) => {
  const getClasses = (ap) => {
    const bclass = ap === value ? 'btn-secondary' : 'btn-outline-secondary';
    return `btn btn-sm ${bclass}`;
  }
  return (
    <div className="AmPmSelector btn-group-vertical">
        <button 
          className={getClasses('AM')}
          onClick={(evt) => {evt.preventDefault(); onChange('AM')}}
        >AM</button>
        <button 
          className={getClasses('PM')}
          onClick={(evt) => {evt.preventDefault(); onChange('PM')}}
        >PM</button>
    </div>
  )
}

class TimeSelector extends Component {

  getAmPm = () => {
    return this.props.hh < 12 ? 'AM' : 'PM';
  }

  handleHourChange = (hh) => {
    this.props.onChange(hh, this.props.mm);
  }

  handleMinuteChange = (mm) => {
    this.props.onChange(this.props.hh, mm);
  }

  handleAmPmChange = (ap) => {
    const oldAP = this.getAmPm();
    let hh = this.props.hh;
    if (ap === 'AM' && oldAP === 'PM') 
      hh -= 12;
    if (ap === 'PM' && oldAP === 'AM') 
      hh += 12;
    this.props.onChange(hh, this.props.mm);
  }

  handleSelectNow = () => {
    const now = new Date();
    this.props.onChange(now.getHours(), now.getMinutes());
    this.props.onDismiss();
  }

  render() {

    const { hh, mm, pickerFormat, name, id } = this.props;

    return (
      <div className="Overlay TimeSelector card p-2" name={name+'_selector'} id={id+'_selector'}>
        <div className="pb-2">
          <button type="button" className="btn btn-sm btn-link text-secondary pl-0" onClick={this.handleSelectNow}>Use Current Time</button>
          <button
            type="button"
            className="close text-muted"
            title="Close"
            onClick={this.props.onDismiss}>
            <span>&times;</span>
          </button>
        </div>
        <div className="SelectorBody">
          <HourSelector value={hh} onChange={this.handleHourChange} pickerFormat={pickerFormat} />
          <MinuteSelector value={mm} onChange={this.handleMinuteChange}/>
          {pickerFormat ==='12' && 
          <AmPmSelector value={this.getAmPm()} onChange={this.handleAmPmChange} onDismiss={this.props.onDismiss} />
          }
        </div>
      </div>
    );
  }
}

export default TimeSelector;