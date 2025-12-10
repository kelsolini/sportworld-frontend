import { useState, createContext, type ReactNode, useEffect } from "react";
import { type IVenue } from "../interfaces/IVenue";
import type { IVenueContext } from "../interfaces/IVenueContext";
import VenueService from "../services/VenueService";
import type { IVenueSingelResponse, IDefaultResponse } from "../interfaces/ResponseInterfaces";

export const VenueContext = createContext<IVenueContext | null>(null);

interface Props { children: ReactNode }

export const VenueProvider = ({ children }: Props) => {

    const [venues, setVenues] = useState<IVenue[]>([]);
    const [idVenue, setIdVenue] = useState<IVenue | null>(null);
    const [nameVenues, setNameVenues] = useState<IVenue[]>([]);

    const setVenuesFromService = async () => {
        const response = await VenueService.getAllVenues();
        if (response.success && response.data) {
            setVenues(response.data);
        } else {
            console.log(Error);
        }
    };

    useEffect(() => {
        setVenuesFromService();
    }, []);

    // Venue quantity
    const fetchVenueQuantity = (): number => {
        return venues.length;
    };

    // Søk venue på id
    const fetchVenueById = async (id: number): Promise<IVenueSingelResponse> => {
        const response = await VenueService.getVenueById(id);
        if (response.success && response.data) {
            setIdVenue(response.data);
            return {
                success: true,
                data: response.data
            };
        } else {
            console.log(Error);
            return {
                success: false,
                data: null
            };
        }
    };

    // Søk venue på name 
    const fetchVenueByName = async (name: string) => {
        const response = await VenueService.getVenueByName(name);
        if (response.success && response.data) {
            setNameVenues(response.data);
        } else {
            console.log(Error);
        }
    };

    // PUT / Edit venue
    const putVenue = async (editedVenue: IVenue, image: File): Promise<IDefaultResponse> => {
        const response = await VenueService.putVenue(editedVenue, image);
        if (response.success && response.data) {
            const updatedVenue: IVenue = response.data;
            setVenues(prev => [...prev, updatedVenue]);
        }
        return response;
    };

    // POST
    const saveVenue = async (newVenue: IVenue, image: File): Promise<IDefaultResponse> => {
        const response = await VenueService.postVenue(newVenue, image);
        if (response.success === true && response.data != null) {
            const newVenueWithId: IVenue = response.data;
            setVenues(prev => [...prev, newVenueWithId]);
        }
        return response;
    };

    return (
        <VenueContext.Provider value={{
            venues,
            fetchVenueQuantity,
            fetchVenueById,
            idVenue,
            fetchVenueByName,
            nameVenues,
            saveVenue,
            putVenue
        }}>
            {children}
        </VenueContext.Provider>
    );
};