import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import './Calendar.css'

const Calendar = ({ onChange }) => {


    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        onChange(selection);
        setState([selection]);
    };
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 2),
            key: 'selection'
        }
    ]);
    return (
        <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
        />
    );
};

Calendar.propTypes = {
    onChange: PropTypes.func
};

export default Calendar;