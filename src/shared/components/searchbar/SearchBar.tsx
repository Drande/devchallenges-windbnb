import { FunctionComponent, useState, useEffect } from 'react';
import { StayLocation, Guests } from "../../models/search";
import Button from "../button/Button";
import { getListLocations } from '../../services/Stays.service';
import { v4 } from "uuid";
import RangeInput from '../range-input/RangeInput';
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
    location?: string;
    guests?: Guests;
    expanded?: boolean;
    onSearch?: any;
}


type SearchView = "location" | "guests";
const viewInitial: SearchView = "location";

const SearchBar: FunctionComponent<SearchBarProps> = ({ onSearch, location="", guests={ adults: 0, children: 0 }, expanded }) => {
    const handleSearch = () => {
        onSearch({ location: locInput, guests: guestsSelection });
    }

    const [search, setSearch] = useState({ location: "", guests: { adults: 0, children: 0 } });

    const handleLocationClicked = (loc: string) => {
        setLocInput(loc);
        setSearch( { location: loc, guests: search.guests } );
    }

    /* Guests selectors state */
    const [guestsSelection, setGuests] = useState(guests);
    const sumGuests = Object.values(guestsSelection).reduce((acc, cur) => {return acc+=cur;}, 0);

    /* Suggested locations during search */
    const [locations, setLocations] = useState<Partial<StayLocation>[]>([]);

    /* Search location input */
    const [locInput, setLocInput] = useState("");
    useEffect(() => {
        getListLocations(locInput).then(setLocations);
    }, [locInput]);


    /* View state */
    const [view, setView] = useState<SearchView>(viewInitial);


    const outputElement = expanded ?
    (
        <div className="column w-full h-full justify-content-between g-2rem">
            <div className={[styles["bar-container"], styles["expanded"], "border-round radius-16px shadow-1 flex-grid w-full justify-content-evenly"].join(" ")}>
                <div className='column col-12 sm:col-4 cursor-pointer py-10px px-20px' onClick={() => {setView("location")}}>
                    <label className={"bar-label-text text-nowrap color-gray-1"}>LOCATION</label>
                    <input placeholder='Add location' className={'bar-button-text w-full '+ styles["bar-input"]} type="text" value={locInput} onChange={($event) => { setLocInput($event.target.value) }} />
                </div>
                <div className="divider"></div>
                <div className='column col-12 sm:col-4 cursor-pointer py-10px px-20px' onClick={() => {setView("guests")}}>
                    <label className={"bar-label-text text-nowrap color-gray-1"}>GUESTS</label>
                    <span  className={"bar-button-text text-nowrap" + (sumGuests === 0 ? " color-gray-4" : "")}>{sumGuests > 0 ? (sumGuests + " guests") : "Add guests"}</span>
                </div>
                <div className="sm-hide divider"></div>
                <div className="row justify-content-center col-12 sm:col-4 align-items-center">
                    <Button onClick={handleSearch} className="sm-hide" label="Search" startIcon="search" disableShadow color="primary"></Button>
                </div>
            </div>
            <div className='row h-full overflow-hidden'>
                <div className={(styles["section-column"] + (view !== "location" ? " sm-hide" : ""))}>
                    {view === "location" ? buildLocationElements(locations, handleLocationClicked) : null}
                </div>
                <div className={(styles["section-column"] + (view !== "guests" ? " sm-hide" : ""))}>
                    {view === "guests" ? (
                        <div className='column'>
                            <span className='range-text color-gray-1'>Adults</span>
                            <span className='range-text color-gray-4'>Ages 13 or above</span>
                            <RangeInput onChange={(value) => {
                                setGuests({...guestsSelection, adults: value })
                            }} value={guestsSelection.adults}></RangeInput>
                            <span className='range-text color-gray-1'>Children</span>
                            <span className='range-text color-gray-4'>Ages 2-12</span>
                            <RangeInput onChange={(value) => {
                                setGuests({...guestsSelection, children: value })
                            }} value={guestsSelection.children}></RangeInput>
                        </div>
                    ) : null}
                </div>
                <div className={styles["section-column"]}></div>
            </div>
            <Button onClick={handleSearch} className="sm-show align-self-center" label="Search" startIcon="search" disableShadow color="primary"></Button>
        </div>
    ):
    (
        <div className="column w-full">
            <div className={[styles["bar-container"], "border-round radius-16px shadow-1 align-items-center row cursor-pointer justify-content-evenly"].join(" ")}>
                <span className={"bar-button-text p-1rem text-nowrap" + (location ? "" : " color-gray-4")}>{location ? location : "Add location"}</span>
                <div className="divider"></div>
                <span className={"bar-button-text p-1rem text-nowrap" + (sumGuests === 0 ? " color-gray-4" : "")}>{sumGuests > 0 ? (sumGuests + " guests") : "Add guests"}</span>
                <div className="divider"></div>
                <div className="row justify-content-center">
                    <span className="material-icons color-primary p-1rem">search</span>
                </div>
            </div>
        </div>
    );
    return (
        outputElement
    );
}
 
export default SearchBar;





//Utility
const buildLocationElements = (locs: Partial<StayLocation>[], onSelect: (s:string) => void) => {
    return locs.map(loc => {
        const locString = [loc.city, loc.country].filter(_ => _).join(", ");
        return (
            <div key={v4()} onClick={() => {onSelect(locString)}} className='row align-items-center cursor-pointer hover-primary text-nowrap' style={{gap: "10px"}}>
                <i className='material-icons'>pin_drop</i>
                <span>{locString}</span>
            </div>
        );
    });
}