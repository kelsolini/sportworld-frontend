import { type IVenue } from "../../interfaces/IVenue";
import VenueService from "../../services/VenueService";

const VenueItem = ({ venue }: { venue: IVenue }) => {

    const handleDelete = async () => {
        console.log("Deleting venue with id:", venue.id);
        const idInput = Number(venue.id);
        await VenueService.deleteVenue(idInput);
    };

    return (
        <article className="bg-white rounded-lg shadow p-4 max-w-sm col-span-3 md:col-span-6">
            <div className="space-y-1">
                <h3 className="text-sm text-gray-500">Id: {venue.id}</h3>
                <h2 className="text-lg font-semibold">{venue.name}</h2>
                <p className="text-sm text-gray-600">Capacity: {venue.capacity}</p>
            </div>

            <img
                className="mt-3 w-full h-48 object-cover rounded-md"
                src={`http://localhost:5279/images/venue/${venue.image}`}
                alt={venue.name}
            />

            <button
                className="mt-4 w-full py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                onClick={handleDelete}
            >
                Delete
            </button>
        </article>
    );
};

export default VenueItem;
