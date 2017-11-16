import React, {Component} from 'react';
import moment from 'moment';
import DatePicker from '../lib';

class SizingDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date1: { value: null },
      date2: { value: '2017-11-25' },
      date3: { value: moment() },
      width: 0
    }
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateStatePart = (statePart) => {
    this.setState(statePart);
  }

  render() {

    return (
      <form style={{ maxWidth: '460px' }}>
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
            onChange={(result) => this.updateStatePart({ date1 : result }) }
            inputSize="sm"
            />
        </div>
        <div className="form-group">
          <label>Normal</label>
          <DatePicker 
            value={this.state.date2.value} 
            onChange={(result) => this.updateStatePart({ date2 : result }) }
            />
        </div>
        <div className="form-group">
          <label>Large</label>
          <DatePicker
            value={this.state.date3.value}
            onChange={(result) => this.updateStatePart({ date3 : result }) }
            inputSize="lg"
            />
        </div>
      </form>
    );
  }
}

export default SizingDemo;
