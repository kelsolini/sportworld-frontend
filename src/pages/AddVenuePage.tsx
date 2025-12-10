import VenueList from "../components/Venue/VenueList";
import VenueNew from "../components/Venue/VenueNew";

const AddVenuePage = () => {
    return (
        <>
            <h1>Add venue page</h1>
            <VenueNew/>
            <VenueList/>
        </>
    );
}

export default AddVenuePage;