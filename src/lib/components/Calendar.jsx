import React, {Component} from 'react';
import moment from 'moment';

class CalendarMonthSelect extends Component {

  renderOption(month, displayYM) {
    const monthName = moment([displayYM.year, month]).format("MMMM");
    return (
      <option key={month} value={month}>{monthName}</option>
    )
  }

  handleChange = (event) => {
    const ym = {
      year: this.props.displayYM.year,
      month: parseInt(event.target.value, 10)
    };
    this
      .props
      .onChangeYM(ym);
  }

  render() {

    const {displayYM} = this.props;

    return (
      <select
        value={displayYM.month}
        onChange={this.handleChange}
        className="btn btn-outline-dark border-standard"
        style={{
        display: 'inline-block',
        width: 'auto'
      }}>
        {[
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ].map(month => this.renderOption(month, displayYM))}
      </select>
    )
  }
}

class CalendarYearSelect extends Component {

  renderOption(year, displayYM) {
    return (
      <option key={year} value={year}>{year}</option>
    )
  }

  handleChange = (event) => {
    const ym = {
      year: parseInt(event.target.value, 10),
      month: this.props.displayYM.month
    };
    this
      .props
      .onChangeYM(ym);
  }

  render() {

    const {displayYM} = this.props;

    const years = [];
    for (let year = displayYM.year - 10; year < displayYM.year + 10; year++) {
      years.push(year);
    };

    return (
      <select
        value={displayYM.year}
        onChange={this.handleChange}
        className="btn btn-outline-dark border-standard"
        style={{
        display: 'inline-block',
        width: 'auto'
      }}>
        {years.map(year => this.renderOption(year, displayYM))}
      </select>
    )
  }
}

class CalendarHead extends Component {

  handleClickPrev = (event) => {
    event.preventDefault();
    let ym = this.props.displayYM;
    if (ym.month === 0) {
      ym.year--;
      ym.month = 11;
    } else {
      ym.month--;
    };
    this
      .props
      .onChangeYM(ym);
  }

  handleClickNext = (event) => {
    event.preventDefault();
    let ym = this.props.displayYM;
    if (ym.month === 11) {
      ym.year++;
      ym.month = 0;
    } else {
      ym.month++;
    };
    this
      .props
      .onChangeYM(ym);
  }

  render() {

    const {displayYM} = this.props;

    return (
      <thead>
        <tr>
          <td colSpan="7">

            <div
              className="form-inline"
              style={{
              display: 'inline-flex'
            }}>

              <div className="btn-group btn-group-sm">

                <button
                  type="button"
                  className="btn btn-outline-dark border-standard"
                  onClick={this.handleClickPrev}
                  title="Previous month">
                  &lsaquo;
                </button>

                <CalendarMonthSelect displayYM={displayYM} onChangeYM={this.props.onChangeYM}/>

                <button
                  type="button"
                  className="btn btn-outline-dark border-standard"
                  onClick={this.handleClickNext}
                  title="Next month">
                  &rsaquo;
                </button>

                <CalendarYearSelect displayYM={displayYM} onChangeYM={this.props.onChangeYM}/>

              </div>

            </div>

            <button
              type="button"
              className="close text-muted"
              title="Close"
              onClick={this.props.onDismiss}>
              <span>&times;</span>
            </button>

          </td>
        </tr>
        <tr className="DowHeadings">
          {[
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ].map((dow, idx) => {
            return (
              <td key={idx}>
                {dow}
              </td>
            )
          })}
        </tr>
      </thead>
    )
  }
}

class CalendarBody extends Component {

  makeData = () => {

    const {displayYM, selectedYMD} = this.props;

    const tm = moment();
    const today = {
      year: tm.year(),
      month: tm.month(),
      day: tm.date()
    };

    let day = moment([displayYM.year, displayYM.month, 1]);
    let dow = day.day();
    day.subtract(dow, 'days');

    let lastDay = moment([displayYM.year, displayYM.month, 1])
      .add(1, 'months')
      .subtract(1, 'days');
    dow = lastDay.day();
    lastDay.add(6 - dow, 'days');

    const dates = [];

    while (day.isSameOrBefore(lastDay)) {
      const ds = {
        year: day.year(),
        month: day.month() + 1,
        day: day.date(),
        title: day.format('dddd, MMMM Do YYYY'),
        value: day.format('YYYY-MM-DD')
      };

      ds.isSelected = selectedYMD.hasValue && selectedYMD.year === ds.year && selectedYMD.month === ds.month - 1 && selectedYMD.day === ds.day;
      ds.isDisplayMonth = ds.month - 1 === displayYM.month;
      ds.isToday = ds.year === today.year && ds.month - 1 === today.month && ds.day === today.day;

      dates.push(ds);
      day.add(1, 'days');
    }

    return dates;

  }

  getDataRow = (dates, rowNum) => {
    const row = [];
    for (let idx = rowNum * 7; idx < (rowNum + 1) * 7; idx++) {
      row.push(dates[idx]);
    }
    return row;
  }

  getDataRows = () => {
    const dates = this.makeData();
    const rows = [];
    for (let rowNum = 0; rowNum < dates.length / 7; rowNum++) {
      rows.push(this.getDataRow(dates, rowNum));
    };
    return rows;
  }

  renderDay(day, idx) {
    let classes = 'btn btn-sm';
    if (day.isSelected) {
      classes += ' btn-info';
    } else {
      classes += ' btn-light';
      if (!day.isDisplayMonth) {
        classes += ' text-muted';
      };
      if (day.isToday) {
        classes += ' border border-info';
      }
    }

    let title = day.title + (day.isToday
      ? ' (Today)'
      : '') + (day.isSelected
      ? ' (Selected)'
      : '');

    return (
      <td key={idx}>
        <button
          type="button"
          className={classes}
          title={title}
          onClick={() => this.props.onDateSelected(day.value)}>
          {day.day}
        </button>
      </td>
    )
  }

  renderRow(row, idx) {
    return (
      <tr key={idx}>
        {row.map((day, idx) => this.renderDay(day, idx))}
      </tr>
    )
  }

  render() {

    const dataRows = this.getDataRows();

    return (
      <tbody>
        {dataRows.map((row, idx) => this.renderRow(row, idx))}
      </tbody>
    )
  }

}

class Calendar extends Component {

  constructor(props) {
    super(props);

    const sel = this.props.selectedMoment;

    const selectedYMD = sel && sel.isValid()
      ? {
        hasValue: true,
        year: sel.year(),
        month: sel.month(),
        day: sel.date()
      }
      : {
        hasValue: false
      };

    const today = moment();

    const displayYM = selectedYMD.hasValue
      ? {
        year: selectedYMD.year,
        month: selectedYMD.month
      }
      : {
        year: today.year(),
        month: today.month()
      }

    this.state = {
      selectedYMD,
      displayYM
    }
  }

  handleChangeYM = (displayYM) => {
    this.setState({displayYM})
  }

  render() {

    const {name, id} = this.props;
    const {selectedYMD, displayYM} = this.state;
    const todayText = moment().format('dddd, MMMM Do YYYY');

    return (
      <div className="Overlay Calendar card p-2" name={name+'_calendar'} id={id+'_calendar'}>
        <table>
          <CalendarHead
            displayYM={displayYM}
            onChangeYM={this.handleChangeYM}
            onDismiss={this.props.onDismiss}/>
          <CalendarBody
            displayYM={displayYM}
            selectedYMD={selectedYMD}
            onDateSelected={this.props.onDateSelected}/>
        </table>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-sm btn-link text-muted pl-0"
            title="Select today's date"
            onClick={() => this.props.onDateSelected(moment())}>
            {todayText}
          </button>
        </div>
      </div>
    );
  }
}

export default Calendar;