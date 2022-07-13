import stays from "../../assets/data/stays.json";
import { StayLocation, StaySearch } from "../models/search";
import { Stay } from "../models/stay";

const suggestLimit = 12;

export const fetchStays = async (conditions?: StaySearch): Promise<Stay[]> => {
    return new Promise((resolve, _ ) => {
        setTimeout(() => {
            if(!conditions) { resolve(stays as Stay[]); return; }
            let staysFound = stays as Stay[];
            const location = conditions.location;
            if(location) { staysFound = filterByLocation(staysFound, location.toLowerCase()) }
            const guests = conditions.guests.adults + conditions.guests.children;
            if(guests) { staysFound = staysFound.filter(stay => (stay.maxGuests ? stay.maxGuests : Infinity) >= guests) }
            resolve(staysFound);
        }, 500);
    });
}

export const getListLocations = async (search: string): Promise<Partial<StayLocation>[]> => {
    return new Promise((resolve, _ ) => {
        setTimeout(() => {
            //Map to stays and remove duplicates
            let locations: Partial<StayLocation>[] = (stays as Stay[])
            .map(stay => { return { country: stay.country, city: stay.city }; } )
            .reduce((prev, curr) => {
                if(!prev.some(loc => (loc.country === curr.country && loc.city === curr.city))) {
                    prev.push(curr);
                }
                return prev;
            }, ([] as Partial<StayLocation>[]));
            
            if(!search) {
                resolve(locations.filter((_,i) => i<suggestLimit));
                return;
            }
            locations = filterByLocation(locations, search.toLowerCase())
            .filter((_,i) => i<suggestLimit);
            resolve(locations);
        }, 500);
    });
}


const filterByLocation = (locations: Partial<StayLocation>[], filterBy: string) => {
    return locations.filter(loc => {
        return [loc.city, loc.country]
        .filter(_ => _)
        .join(", ")
        .toLowerCase()
        .includes(filterBy);
    });
}