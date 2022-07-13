
export type Guests = {
    adults: number;
    children: number;
}

export type StayLocation = {
    city: string;
    country: string;
}

export type StaySearch = {
    location: string;
    guests: Guests;
}