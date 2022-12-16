import "./Header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import PlacesAutocomplete from "../SeachBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {

    const navigate = useNavigate()

    const [placeName, setplaceName] = useState();

    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        capacity: 1,

    });

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            };

        });
        console.log('--------------console.log(options)---------', options.capacity)
    };

    return (
        <div className="header">

            <div className="headerSearch">
                <div className="headerSearchItem">
                    <PlacesAutocomplete setplaceName={setplaceName} />
                </div>
                <div className="headerSearchItem">

                    <span
                        onClick={() => setOpenDate(!openDate)}
                        className="headerSearchText "
                    >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                        date[0].endDate,
                        "MM/dd/yyyy"
                    )}`}</span>
                    {openDate && (
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="date"
                        />
                    )}
                </div>
                <div className="headerSearchItem">

                    <span
                        onClick={() => setOpenOptions(!openOptions)}
                        className="headerSearchText"
                    >{`Capacidad: ${options.capacity}  `}</span>
                    {openOptions && (
                        <div className="options">
                            <div className="optionsItems">
                                <span className="optionText">Capacidad</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.capacity <= 1}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("capacity", "d")}
                                    >
                                        -
                                    </button>
                                    <span className="optionCounterNumber">
                                        {options.capacity}
                                    </span>
                                    <button
                                        className="optionCounterButton"
                                        onClick={() => handleOption("capacity", "i")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Link to={`/properties/list?city=${placeName}&capacity=${options.capacity}&from=${date[0].startDate.getTime()}&to=${date[0].endDate.getTime()}`}>
                    <Button className=" headerBtn btn">Buscar</Button>
                </Link>
                {/* <div className="headerSearchItem">
                    <button className="headerBtn">Search</button>
                </div> */}
            </div>
        </div>
    )
}
export default Header