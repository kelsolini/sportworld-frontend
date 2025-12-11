import { useContext, useRef, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";

const NewAthlete = () => {

    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLInputElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);
    const imageInput = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | null>(null);
    // purchaseStatus skal være false som default
    // const purchaseStatus = useRef<HTMLInputElement>(false);

    const { saveAthlete } = useContext(AthleteContext) as IAthleteContext;

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files != null) {
            setImage(files[0]);
        }
    }

    const handleSaveAthlete = async () => {
        if (
            nameInput.current && nameInput.current?.value.trim() != "" &&
            genderInput.current && genderInput.current?.value.trim() != "" &&
            priceInput.current && priceInput.current?.value.trim() != "" &&
            image != null
        ) {
            const newAthlete: IAthlete = {
                name: nameInput.current.value,
                gender: genderInput.current.value,
                price: Number(priceInput.current.value),
                image: image.name || "",
                purchaseStatus: false
            }
            await saveAthlete(newAthlete, image);
            nameInput.current.value = "";
            genderInput.current.value = "";
            priceInput.current.value = "";
            setImage(null);
            if (imageInput.current) {
                imageInput.current.value = "";
            }
        }
    }

    return (
        <section className="bg-white rounded-lg shadow p-6 max-w-md space-y-5 col-span-12 md:col-span-6">
            <h2 className="text-xl font-semibold text-gray-800">New Athlete</h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Name</label>
                <input
                    ref={nameInput}
                    type="text"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Gender</label>
                <input
                    ref={genderInput}
                    type="text"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Price</label>
                <input
                    ref={priceInput}
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
                onClick={handleSaveAthlete}
            >
                Save new athlete
            </button>
        </section>
    );
}

export default NewAthlete;