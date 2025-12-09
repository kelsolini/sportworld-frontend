import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IAthleteResponse, IAthleteSingelResponse, IDefaultResponse } from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5279/api/athlete";
const endpointImageUpload = "http://localhost:5279/api/athleteimageupload";

// GET ALL ATHLETES
const getAllAthletes = async () : Promise<IAthleteResponse> =>{
     try{
        const response = await axios.get(endpoint);
        return{
            success: true,
            data: response.data
        }
    }catch{
        return{
            success: false,
            data: null
        }
    }
}

// GET ON ID
const getAthleteById = async (id: number) : Promise<IAthleteSingelResponse> => {
    try{
        const response = await axios.get(`${endpoint}/getbyid/${id}`);
        return{
            success: true,
            data: response.data
        }
    }catch(error){
        return{
            success: false,
            data: null
        }
    }
}

// GET BY NAME
const getAthleteByName = async (name: string): Promise<IAthleteResponse> => {
    try {
        const response = await axios.get(`${endpoint}/GetByName/${name}`);
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        return {
            success: false,
            data: null
        }
    }
}

// PUT
const editAthlete = async (editedAthlete: IAthlete) : Promise<IAthleteSingelResponse> => {
    try{
        const response = await axios.put(endpoint, editedAthlete);
        return{
            success: true,
            data: response.data
            
        }
    }catch(error){
        return{
            success: false,
            data: null
        }
    }
}

// POST OBJEKT MED BILDE
   const postAthlete = async (athlete: IAthlete, image: File) => {
    try {
        const response = await axios.post(endpoint, athlete);

        const formData = new FormData();
        formData.append("file", image);

        await axios.post(endpointImageUpload, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return {
            success: true,
            data: response.data
        };

    } catch (error) {
        console.error("POST error:", error);
        return {
            success: false,
            data: null
        }
    }
}

export default {
    getAllAthletes,
    getAthleteById,
    getAthleteByName,
    editAthlete,
    postAthlete
}
   