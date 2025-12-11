import { useRef, useContext, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";


const AthleteEdit = () => {

    const { putAthlete, fetchAthleteById, idAthlete } =
        useContext(AthleteContext) as IAthleteContext;


    const idInput = useRef<HTMLInputElement | null>(null);
    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLInputElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);
    // ImageUploader??
    const [image, setImage] = useState<File | null>(null);

    const purchaseStatusInput = useRef<HTMLInputElement | null>(null);

    let [athletes, setAthletes] = useState(0);

    const getAthleteById = async () => {
        if (idInput.current && idInput.current.value.trim() !== "") {
            const idParsed = Number(idInput.current.value);
            if (!isNaN(idParsed)) {
                //const response = await AthleteService.getAthleteById(idParsed);
                const response = await fetchAthleteById(idParsed);
                if (response.success) {
                    if (
                        idInput.current != null &&
                        nameInput.current != null &&
                        genderInput.current != null &&
                        priceInput.current != null &&
                        purchaseStatusInput.current != null
                    ) {
                        nameInput.current.value = response.data?.name || "";
                        genderInput.current.value = response.data?.gender || "";
                        priceInput.current.value = String(response.data?.price) || "0";
                        purchaseStatusInput.current!.checked =
                            response.data?.purchaseStatus ?? false;

                    }
                } else {
                    console.log("ID is not a number");
                }
            }
        }
    }

    const changeNewImage = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files != null) {
            setImage(files[0]);
            console.log(files[0]);
        }
    }

    const editAthlete = async () => {
        if (
            idInput.current &&
            nameInput.current &&
            genderInput.current &&
            priceInput.current &&
            purchaseStatusInput.current
        ) {
            const id = Number(idInput.current.value.trim());
            const name = nameInput.current.value.trim();
            const gender = genderInput.current.value.trim();
            const price = Number(priceInput.current.value);
            const purchaseStatus = purchaseStatusInput.current.checked;

            const editedAthlete: IAthlete = {
                id: id,
                name: name,
                gender: gender,
                price: price,
                image: image ? image.name : idAthlete?.image ?? "",
                purchaseStatus: purchaseStatus,
            }
            await putAthlete(editedAthlete, image!);



            idInput.current.value = "0";
            nameInput.current.value = "";
            genderInput.current.value = "";
            priceInput.current.value = "";
            purchaseStatusInput.current.checked = false;
        } else {
            console.log("one of the fields are missing");
        }
    }

    const countAthletes = (e: ChangeEvent<HTMLInputElement>) => {
        let countHandel = Number(e.target.value);
        if (countHandel < 0) {
            countHandel = 0;
        }
        setAthletes(countHandel);
    }

    return (
        <section>
            <h3>Edit Athlete</h3>
            <div>
                <label>Id: </label>
                <div>
                    <input
                        ref={idInput}
                        type="number"
                        onChange={countAthletes}
                        value={athletes}
                        className="border"
                        placeholder="Asign ID"
                    />
                    <button onClick={getAthleteById} className="border">
                        Search on id
                    </button>
                </div>

                <div>
                    <label>Name: </label>
                    <div>
                        <input
                            ref={nameInput}
                            type="text"
                            className="border"
                            placeholder="Asign name"
                        />
                    </div>
                </div>

                <div>
                    <label>Gender: </label>
                    <div>
                        <input
                            ref={genderInput}
                            type="text"
                            className="border"
                            placeholder="Asign gender"
                        />
                    </div>
                </div>

                <div>
                    <label>Price: </label>
                    <div>
                        <input
                            ref={priceInput}
                            type="number"
                            className="border"
                            placeholder="Asign price"
                        />
                    </div>
                </div>
                <div>
                    <label>Image</label>
                    <input onChange={changeNewImage} className="border" type="file" />
                </div>
                <div>
                    <label>Purchased: </label>
                    <div>
                        <input
                            ref={purchaseStatusInput}
                            type="checkbox"
                            className="border"
                        />
                    </div>
                </div>
            </div>

            <button onClick={editAthlete} className="border">
                Edit
            </button>
        </section>
    );
}


export default AthleteEdit;