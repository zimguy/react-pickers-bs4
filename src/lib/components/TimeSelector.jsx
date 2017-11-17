import React, {Component} from 'react';

const padZero = (num) => {
  let s = '0' + num;
  return s.substr(s.length - 2);
}

const HourSelector = (props) => {
  const arraySize = props.pickerFormat === '12' ? 13 : 24;
  const value = props.pickerFormat === '12' ? props.value % 12 : props.value;
  return (
    <select
      className="btn btn-outline-dark border-standard"
      onChange={props.onChange}
      value={value}>
      {[...Array(arraySize).keys()].map(hour => (
        <option key={hour} value={hour}>{padZero(hour)}</option>
      ))}
    </select>
  )
}

const AmPmSelector = (props) => {
  return (
    <select
      className="btn btn-outline-dark border-standard"
      onChange={(event) => props.onChange(event.target.value)}
      value={props.value}>
      <option value='AM'>AM</option>
      <option value='PM'>PM</option>
    </select>
  )
}

const MinuteSelector = (props) => {

  return (
    <select
      className="btn btn-outline-dark border-standard"
      onChange={props.onChange}
      value={props.value}>
      {[...Array(60).keys()].map(min => (
        <option key={min} value={min}>
          {padZero(min)}
        </option>
      ))}
    </select>
  )
}

class TimeSelector extends Component {

  getAmPm = () => {
    return this.props.hh < 12 ? 'AM' : 'PM';
  }

  handleHourChange = (event) => {
    let hh = parseInt(event.target.value, 10);
    if (this.props.pickerFormat==='12' && this.getAmPm() === 'PM')
      hh += 12;
    this.props.onChange(hh, this.props.mm);
  }

  handleMinuteChange = (event) => {
    const mm = parseInt(event.target.value, 10);
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

    const { hh, mm, pickerFormat } = this.props;
    const ap = this.getAmPm();

    return (
      <div className="Overlay TimeSelector card p-2">
        <div className="pb-2">
          <button type="button" className="btn btn-sm btn-link text-secondary pl-0" onClick={this.handleSelectNow}>Use current time</button>
          <button
            type="button"
            className="close text-muted"
            title="Close"
            onClick={this.props.onDismiss}>
            <span>&times;</span>
          </button>
        </div>
        <div>
          <div className="btn-group btn-group-sm">
            <HourSelector value={hh} onChange={this.handleHourChange} pickerFormat={pickerFormat}/>
            <MinuteSelector value={mm} onChange={this.handleMinuteChange}/>
            {pickerFormat ==='12' && <AmPmSelector value={this.getAmPm()} onChange={this.handleAmPmChange}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default TimeSelector;