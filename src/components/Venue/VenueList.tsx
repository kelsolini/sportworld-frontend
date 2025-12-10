import { useContext } from "react";
import type { IVenue } from "../../interfaces/IVenue";
import VenueItem from "./VenueItem";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";

const VenueList = () => {

    const { venues } = useContext(VenueContext) as IVenueContext;

    const getVenueJSX = () => {
        const venueJSX = venues.map((venue, index) => {
            return (
                <VenueItem
                    key={"venue" + index}
                    venue={venue}
                />
            );
        });
        return venueJSX;
    };

    return (
        <section className="col-span-6">
            <header>
                Venues liste
            </header>
            {getVenueJSX()}
        </section>
    );
};

export default VenueList;
