import React, {Component} from 'react';
import { TimePicker } from '../lib';

class TimePickerDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time1: null,
      time1Error: '',
      time1Result: null,
      time2: null,
      time2Error: '',
      time2Result: null
    }
  }

  validateResult = (pickerResult) => {
    let error = '';
    if (!pickerResult.hasValue) {
      error = 'Time is required!';
    } else if (!pickerResult.isValid) {
      error = 'Time is invalid!';
    };
    return error;
  }

  handleTime1Change = (pickerResult) => {
    const error = this.validateResult(pickerResult);
    this.setState({time1: pickerResult.value, time1Error: error, time1Result: pickerResult});
  }

  handleTime2Change = (pickerResult) => {
    const error = this.validateResult(pickerResult);
    this.setState({time2: pickerResult.value, time2Error: error, time2Result: pickerResult});
  }

  render() {
    const {time1, time1Error, time1Result, time2, time2Error, time2Result} = this.state;
    return (
      <div style={{
        maxWidth: '460px'
      }}>
        <form>
          <div className="form-group">
            <label>12 Hour Time</label>
            <TimePicker
              id="myTimePicker"
              value={time1}
              onChange={this.handleTime1Change}
              placeholder="HH:MM AM/PM"
              error={time1Error}
              autoClose={true}
              />
          </div>
          {time1Result && 
          <div className="form-group">
            <label>Picker Result</label>
            <pre className="pre border rounded bg-light p-3">
              {JSON.stringify(time1Result, null, 2)}
            </pre>
          </div>
          }
          <div className="form-group">
            <label>24 Hour Time</label>
            <TimePicker
              pickerFormat="24"
              value={time2}
              onChange={this.handleTime2Change}
              placeholder="HH:MM"
              error={time2Error}
              />
          </div>
          {time2Result && 
          <div className="form-group">
            <label>Picker Result</label>
            <pre className="pre border rounded bg-light p-3">
              {JSON.stringify(time2Result, null, 2)}
            </pre>
          </div>
          }
        </form>
      </div>
    );
  }
}

export default TimePickerDemo;
