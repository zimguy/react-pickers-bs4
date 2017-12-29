import React, {Component} from 'react';

import './TimeSelector.css';

const NumberLine = ({ min, max, value, onChange }) => {
  
  const nums = [];
  for (let i=min; i<=max; i++) { nums.push(i); }

  const getClasses = (i) => {
    const bclass = i === value ? 'btn-primary' : 'btn-outline-secondary';
    return `btn btn-sm ${bclass} mr-1 p-0 Number`;
  }

  return (
    <div className="NumberLine">
      {nums.map(num => (
        <button 
          key={num} 
          className={getClasses(num)}
          onClick={(evt) => {evt.preventDefault(); onChange(num)}}
        >{num}</button>
      ))}
    </div>
  )

}

const HourSelector = ({ pickerFormat, value, onChange }) => {
  
  const val = pickerFormat === '12' && value>12 ? value % 12 : value;

  return (
    <div className="HourSelector">
      Hour
      {pickerFormat === '12' &&
      <div className="text-center">
        <NumberLine min={0} max={9} value={val} onChange={onChange} />
        <NumberLine min={10} max={12} value={val} onChange={onChange} />
      </div>
      }
      {pickerFormat === '24' &&
      <div className="text-center">
        <NumberLine min={0} max={9} value={val} onChange={onChange} />
        <NumberLine min={10} max={19} value={val} onChange={onChange} />
        <NumberLine min={20} max={23} value={val} onChange={onChange} />
      </div>
      }
    </div>
  )
}

const MinuteSelector = ({ value, onChange }) => {
  return (
    <div className="MinuteSelector pt-2">
      Minute
      <div className="text-center">
        <NumberLine min={0} max={9}   value={value} onChange={onChange} />
        <NumberLine min={10} max={19} value={value} onChange={onChange} />
        <NumberLine min={20} max={29} value={value} onChange={onChange} />
        <NumberLine min={30} max={39} value={value} onChange={onChange} />
        <NumberLine min={40} max={49} value={value} onChange={onChange} />
        <NumberLine min={50} max={59} value={value} onChange={onChange} />
      </div>
    </div>
  )
}

const AmPmSelector = ({value, onChange }) => {
  const getClasses = (ap) => {
    const bclass = ap === value ? 'btn-primary' : 'btn-outline-secondary';
    return `btn btn-sm ${bclass} mr-1 p-0 Number`;
  }
  return (
    <div className="AmPmSelector pt-2">
      <div className="NumberLine">
        <button 
          className={getClasses('AM')}
          onClick={(evt) => {evt.preventDefault(); onChange('AM')}}
        >AM</button>
        <button 
          className={getClasses('PM')}
          onClick={(evt) => {evt.preventDefault(); onChange('PM')}}
        >PM</button>
      </div>
    </div>
  )
}

class TimeSelector extends Component {

  getAmPm = () => {
    return this.props.hh < 12 ? 'AM' : 'PM';
  }

  handleHourChange = (hh) => {
    if (this.props.pickerFormat==='12') {
      const ap = this.getAmPm();
      if (ap === 'PM' && hh > 0)
        hh += 12;
    };      
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
        <div>
          <div>
            <HourSelector value={hh} onChange={this.handleHourChange} pickerFormat={pickerFormat}/>
            <MinuteSelector value={mm} onChange={this.handleMinuteChange}/>
            {pickerFormat ==='12' && 
            <AmPmSelector value={this.getAmPm()} onChange={this.handleAmPmChange} onDismiss={this.props.onDismiss} />
            }
            <div className="float-right">
              <button type="button" className="btn btn-link text-secondary" onClick={this.props.onDismiss}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeSelector;