import axios from "axios";
import type { IVenue } from "../interfaces/IVenue";
import type { 
    IVenueResponse, 
    IVenueSingelResponse, 
    IDefaultResponse 
} from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5279/api/venue";
const endpointImageUpload = "http://localhost:5279/api/venueimageupload";

// GET ALL VENUES
const getAllVenues = async (): Promise<IVenueResponse> => {
    try {
        const response = await axios.get(endpoint);
        return {
            success: true,
            data: response.data
        };
    } catch {
        return {
            success: false,
            data: null
        };
    }
};

// GET BY ID
const getVenueById = async (id: number): Promise<IVenueSingelResponse> => {
    try {
        const response = await axios.get(`${endpoint}/getbyid/${id}`);
        return {
            success: true,
            data: response.data
        };
    } catch {
        return {
            success: false,
            data: null
        };
    }
};

// GET BY NAME
const getVenueByName = async (name: string): Promise<IVenueResponse> => {
    try {
        const response = await axios.get(`${endpoint}/GetByName/${name}`);
        return {
            success: true,
            data: response.data
        };
    } catch {
        return {
            success: false,
            data: null
        };
    }
};

// PUT VENUE (med bilde)
const putVenue = async (editedVenue: IVenue, newImage: File) => {
    try {
        const response = await axios.put(endpoint, editedVenue);

        if (newImage) {
            const formData = new FormData();
            formData.append("file", newImage);

            await axios.post(endpointImageUpload, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
        }

        return {
            success: true,
            data: response.data
        };
    } catch {
        return {
            success: false,
            data: null
        };
    }
};

// POST VENUE med bilde
const postVenue = async (venue: IVenue, image: File) => {
    try {
        const response = await axios.post(endpoint, venue);

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
        };
    }
};

// DELETE VENUE
const deleteVenue = async (id: number) => {
    try {
        await axios.delete(`${endpoint}/${id}`);
        return {
            success: true
        };
    } catch {
        console.error("DELETE error:");
        return {
            success: false
        };
    }
};

export default {
    getAllVenues,
    getVenueById,
    getVenueByName,
    putVenue,
    postVenue,
    deleteVenue
};
