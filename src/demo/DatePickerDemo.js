import React, {Component} from 'react';
import { DatePicker } from '../lib';

class DatePickerDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      dateError: '',
      pickerResult: null
    }
  }

  handleDateChange = (pickerResult) => {
    let dateError = '';
    if (!pickerResult.hasValue) {
      dateError = 'Please provide a date.';
    } else if (!pickerResult.isValid) {
      dateError = 'Please provide a valid date.';
    };
    this.setState({date: pickerResult.value, dateError, pickerResult});
  }

  render() {
    const {date, dateError, pickerResult} = this.state;
    return (
      <div style={{
        maxWidth: '460px'
      }}>
        <form>
          <div className="form-group">
            <label>Date</label>
            <DatePicker
              id="myDatePicker"
              value={date}
              onChange={this.handleDateChange}
              placeholder="MM/DD/YYYY"
              error={dateError}/>
          </div>
          {pickerResult && 
          <div className="form-group">
            <label>Picker Result</label>
            <pre className="pre border rounded bg-light p-3">
              {JSON.stringify(pickerResult, null, 2)}
            </pre>
          </div>
          }
        </form>
      </div>
    );
  }
}

export default DatePickerDemo;
