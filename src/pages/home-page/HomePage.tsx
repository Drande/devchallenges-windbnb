import { FunctionComponent } from "react";
import stays from "../../assets/data/stays.json";
import { v4 } from "uuid";
import StayCard from "../../shared/components/stay-card/StayCard";
import "./HomePage.scss";

interface HomePageProps {
    
}
 
const HomePage: FunctionComponent<HomePageProps> = () => {
    
    const staysElements = stays.map((stay: any) => {
        return (
            <div key={v4()} className="card-wrapper">
                <StayCard {...stay}></StayCard>
            </div>
        )
    });
    return (
        <div className="page-container">
            <div className="px-1rem row flex-wrap justify-content-between">
                <h1 className="header">Stays in Finland</h1>
                <span>12+ stays</span>
            </div>
            <div className="card-container">
                {staysElements}
            </div>
        </div>
    );
}
 
export default HomePage;