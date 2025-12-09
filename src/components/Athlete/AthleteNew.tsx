import { useContext, useRef, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";

const NewAthlete = () => {

    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLInputElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | null>(null);
    // purchaseStatus skal være false som default
    // const purchaseStatus = useRef<HTMLInputElement>(false);

    const {saveAthlete} = useContext(AthleteContext) as IAthleteContext;

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(files != null){
            setImage(files[0]);
            console.log(files[0]);
        }
    }

    const handleSaveAthlete = async () => {
        if(
            nameInput.current && nameInput.current?.value.trim() != "" &&
            genderInput.current && genderInput.current?.value.trim() != "" &&
            priceInput.current && priceInput.current?.value.trim() != "" &&
            image != null 
        ){
            const newAthlete : IAthlete = {
                name: nameInput.current.value,
                gender: genderInput.current.value,
                price: Number(priceInput.current.value),
                image: image.name,
                purchaseStatus: false
            }
            await saveAthlete(newAthlete, image);
        }
    }

    return(
        <section>
            <div>
                <label>Name</label>
                <input ref={nameInput} className="border" type="text"/>
            </div>
            <div>
                <label>Gender</label>
                <input ref={genderInput} className="border" type="text"/>
            </div>
            <div>
                <label>Price</label>
                <input ref={priceInput} className="border" type="number"/>
            </div>
            <div>
                <label>Image</label>
                <input onChange={changeHandler} className="border" type="file"/>
            </div>
            <button className="border" onClick={handleSaveAthlete}>Save new athlete</button>
        </section>
    );
}

export default NewAthlete;