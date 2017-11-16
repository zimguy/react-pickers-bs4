import React, {Component} from 'react';
import moment from 'moment';
import DatePicker from '../lib';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: { value:null },
      date1Error: '',
      date2: { value: '2017-11-25' },
      date3: { value: moment() },
      width: 0,
      height: 0
    }
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updateDate1 = (date1) => {
    let date1Error = null;
    if (!date1.hasValue) {
      date1Error = 'Date is required.';
    } else if (!date1.isValid) {
      date1Error = 'Date is invalid.';
    }
    this.setState({date1, date1Error});
  }

  updateDate2 = (date2) => {
    this.setState({date2})
  }

  updateDate3 = (date3) => {
    this.setState({date3})
  }

  formatDate(val) {
    if (typeof val === 'undefined') 
      return 'undefined';
    if (val === null) 
      return 'null';
    if (typeof val === 'string') 
      return val;
    if (moment.isMoment(val)) {
      if (val.isValid()) 
        return val.toISOString();
      return 'invalid';
    }
    return JSON.stringify(val);
  }

  render() {

    return (
      <div className="App container p-2" style={{ maxWidth: '460px' }}>
        <div>
          <form>
            <div className="form-group">              
              <label>Current Media Size</label>
              <input type="text" readOnly className="d-sm-none                   form-control form-control-plaintext font-weight-bold" value="XS" />
              <input type="text" readOnly className="d-none d-sm-block d-md-none form-control form-control-plaintext font-weight-bold" value="SM" />
              <input type="text" readOnly className="d-none d-md-block d-lg-none form-control form-control-plaintext font-weight-bold" value="MD" />
              <input type="text" readOnly className="d-none d-lg-block d-xl-none form-control form-control-plaintext font-weight-bold" value="LG" />
              <input type="text" readOnly className="d-none d-xl-block           form-control form-control-plaintext font-weight-bold" value="XL" />
              <span className="text-muted float-right" style={{ marginTop: '-32px', marginRight: '7px'}}>{this.state.width + 'px'}</span>
            </div>
            <div className="form-group">
              <label>Small</label>
              <DatePicker
                value={this.state.date1.value}
                onChange={this.updateDate1}
                inputSize="sm"
                placeholder="Please input a date"
                error={this.state.date1Error}/>
            </div>
            <div className="form-group">
              <label>Normal</label>
              <DatePicker value={this.state.date2.value} onChange={this.updateDate2}/>
            </div>
            <div className="form-group">
              <label>Large</label>
              <DatePicker
                value={this.state.date3.value}
                onChange={this.updateDate3}
                inputSize="lg"/>
            </div>
            <div className="form-group">
              <label>Values</label>
              <input type="text" readOnly className="form-control form-control-plaintext mb-1" value={'Date1: ' + this.formatDate(this.state.date1)} />
              <input type="text" readOnly className="form-control form-control-plaintext mb-1" value={'Date2: ' + this.formatDate(this.state.date2)} />
              <input type="text" readOnly className="form-control form-control-plaintext" value={'Date3: ' + this.formatDate(this.state.date3)} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
