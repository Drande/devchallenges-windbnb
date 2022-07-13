import { FunctionComponent, useEffect, useState } from "react";
import { v4 } from "uuid";
import StayCard from "../../shared/components/stay-card/StayCard";
import "./HomePage.scss";
import logo from "../../assets/images/logo.png";
import SearchBar from '../../shared/components/searchbar/SearchBar';
import { fetchStays } from '../../shared/services/Stays.service';
import { Stay } from "../../shared/models/stay";

interface HomePageProps {
    
}

const StaysInitial: Stay[] = [];

const SearchInitial = {
    location: "",
    guests: { adults: 0, children: 0 }
};

const HomePage: FunctionComponent<HomePageProps> = () => {
    /* Search state */
    const [searchState, setSearch] = useState(SearchInitial);

    /* Stays cards */
    const [stays, setStays] = useState(StaysInitial);
    const staysElements = stays.map(mapStaysToCards);
    useEffect(() => { fetchStays(searchState).then(setStays); }, [searchState]);

    /* Topbar state */
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = (nextState: boolean) => { if(expanded!==nextState) { setExpanded(nextState); } };

    const handleSearch = (search?:any) => {
        setExpanded(false);
        setSearch(search);
    };

    return (
        <>
            {expanded ? (<div onClick={() => toggleExpand(false)} className="z-1 fixed w-view h-view" style={{background:"rgba(79, 79, 79, 0.4)"}}></div>) : undefined}
            <div className="topbar-container">
                <div className={["topbar-wrapper w-view flex-grid g-2rem", expanded ? "justify-content-center bg-white expanded" : "justify-content-between align-items-center" ].join(" ")}>
                    <img className={expanded ? "hide" : "logo"} height={22} src={logo} alt="logo" />
                    <div className={expanded ? "w-full h-full" : ""} onClick={() => toggleExpand(true)} >
                        <SearchBar location={searchState.location} guests={searchState.guests} onSearch={handleSearch} expanded={expanded}></SearchBar>
                    </div>
                </div>
            </div>
            <div className="page-container">
                <div className="row flex-wrap justify-content-between">
                    <h1 className="header">Stays in Finland</h1>
                    <span>{stays.length > 12 ? "12+" : stays.length} stays</span>
                </div>
                <div className="card-container">
                    {staysElements}
                </div>
            </div>
        </>
    );
}
 
export default HomePage;




//Utility
const mapStaysToCards = (stay: any) => {
    return (
        <div key={v4()} className="card-wrapper">
            <StayCard {...stay}></StayCard>
        </div>
    );
}