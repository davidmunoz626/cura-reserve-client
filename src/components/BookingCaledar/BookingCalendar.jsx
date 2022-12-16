import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import './BookingCalendar.css'
import bookingService from "../../services/Booking.service";
import { useParams } from "react-router-dom";



function getDates(startDate, endDate) {
    let array = []
    for (let i = 0; new Date(startDate).getTime() + i < new Date(endDate).getTime(); i = i + 86400000) {
        let day = new Date(startDate).getTime() + i

        array.push(new Date(day));
    }

    return array;
}


const BookingCalendar = ({ state, setState }) => {

    const [bookedDates, setBookedDates] = useState([])
    const { property_id } = useParams()

    const totalBookingDays = []

    const getBookedDate = () => {
        bookingService
            .propertyBooking(property_id)
            .then(({ data }) => {

                data.forEach(booking => {
                    const startDate = booking.startDate
                    const endDate = booking.endDate
                    const BookingDays = getDates(startDate, endDate)
                    totalBookingDays.push(...BookingDays)

                })
                setBookedDates(totalBookingDays)

            })
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getBookedDate()
    }, [])

    console.log('SI SI YA VA', bookedDates)
    return (
        <DateRangePicker
            className="DateRangePicker"
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            months={1}
            disabledDates={bookedDates}
            ranges={state}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
        />

    );
};

BookingCalendar.propTypes = {
    onChange: PropTypes.func
};


export default BookingCalendar;