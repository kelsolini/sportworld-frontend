import { useContext, useRef, useState, type ChangeEvent } from "react";
import type { IVenue } from "../../interfaces/IVenue";
import { VenueContext } from "../../contexts/VenueContext";
import type { IVenueContext } from "../../interfaces/IVenueContext";

const VenueNew = () => {

    const nameInput = useRef<HTMLInputElement | null>(null);
    const capacityInput = useRef<HTMLInputElement | null>(null);
    const imageInput = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const { saveVenue } = useContext(VenueContext) as IVenueContext;

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files != null) {
            setImage(files[0]);
            console.log(files[0]);
        }
    };

    const handleSaveVenue = async () => {
        if (
            nameInput.current && nameInput.current.value.trim() !== "" &&
            capacityInput.current && capacityInput.current.value.trim() !== "" &&
            image != null
        ) {
            const newVenue: IVenue = {
                name: nameInput.current.value,
                capacity: Number(capacityInput.current.value),
                image: image.name
            };

            await saveVenue(newVenue, image);

            // Reset form
            nameInput.current.value = "";
            capacityInput.current.value = "";
            setImage(null);
            if (imageInput.current) {
                imageInput.current.value = "";
            }
        }
    };

    return (
        <section className="bg-white rounded-lg shadow p-6 max-w-md space-y-5 col-span-12 md:col-span-6">
            <h2 className="text-xl font-semibold text-gray-800">New Venue</h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Name</label>
                <input
                    ref={nameInput}
                    type="text"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Capacity</label>
                <input
                    ref={capacityInput}
                    type="number"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Image</label>
                <input
                    ref={imageInput}
                    onChange={changeHandler}
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
            </div>

            <button
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
                onClick={handleSaveVenue}
            >
                Save new venue
            </button>
        </section>
    );
};

export default VenueNew;
