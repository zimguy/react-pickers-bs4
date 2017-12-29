import React, {Component} from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

import DatePickerDemo from './DatePickerDemo';
import TimePickerDemo from './TimePickerDemo';
import SizingDemo from './SizingDemo';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Child = ({match}) => (
  <div className="mt-3 pt-2 pb-2 border border-left-0 border-right-0 border-bottom-0">
    {match.params.id === 'DatePicker' && <DatePickerDemo />}
    {match.params.id === 'TimePicker' && <TimePickerDemo />}
    {match.params.id === 'Sizing' && <SizingDemo />}
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container pt-2">

          <h1>React Picker Demo</h1>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink className="nav-link" to="/DatePicker">Date Picker</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/TimePicker">Time Picker</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Sizing">Sizing</NavLink>
            </li>
          </ul>

          <Route path="/:id" component={Child}/>

        </div>
      </Router>
    )
  }
}

export default App;