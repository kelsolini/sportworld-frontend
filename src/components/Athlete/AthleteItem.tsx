import { useContext } from "react";
import { type IAthlete } from "../../interfaces/IAthlete";
import AthleteService from "../../services/AthleteService";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
const { deleteAthelete } = useContext(AthleteContext) as IAthleteContext;

const handleDelete = async () => {
    if (athlete.id != null) {

     
        await deleteAthelete(athlete.id);
    }
}



    return (
        <article className="bg-white rounded-lg shadow p-4 max-w-sm col-span-3 md:col-span-6">
            <div className="space-y-1">
                <h3 className="text-sm text-gray-500">Id: {athlete.id}</h3>
                <h2 className="text-lg font-semibold">{athlete.name}</h2>
                <p className="text-sm text-gray-600">Gender: {athlete.gender}</p>
                <p className="text-sm text-gray-600">Price: {athlete.price} kr</p>
            </div>

            <img
                className="mt-3 w-full h-48 object-cover rounded-md"
                src={`http://localhost:5279/images/athlete/${athlete.image}`}
                alt={athlete.name}
            />

            <div className="mt-3 text-sm text-gray-600">
                Purchased: {athlete.purchaseStatus ? "Yes" : "No"}
            </div>

            <button
                className="mt-4 w-full py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                onClick={handleDelete}
            >
                Delete
            </button>
        </article>
    );

}

export default AthleteItem;