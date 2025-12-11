import { useState, createContext, type ReactNode, useEffect } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import type { IAthleteContext } from "../interfaces/IAthleteContext";
import AthleteService from "../services/AthleteService";
import type { IAthleteSingelResponse, IDefaultResponse } from "../interfaces/ResponseInterfaces";

export const AthleteContext = createContext<IAthleteContext | null>(null);

interface Props { children: ReactNode }

export const AthleteProvider = ({ children }: Props) => {

    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [idAthlete, setIdAthlete] = useState<IAthlete | null>(null);
    const [nameAthletes, setNameAthletes] = useState<IAthlete[]>([]);
    const [error, setError] = useState<Error | string>("");

    const setAthletesFromService = async () => {
        const response = await AthleteService.getAllAthletes();
        if (response.success && response.data) {
            setAthletes(response.data);
        } else {
            console.log(Error)
        }
    }

    useEffect(() => {
        setAthletesFromService();
    }, [])

    // Athlete quantity
    const fetchAthleteQuantity = (): number => {
        return athletes.length;
    }

    // Søk athlete på id
    const fetchAthleteById = async (id: number): Promise<IAthleteSingelResponse> => {
        const response = await AthleteService.getAthleteById(id);
        if (response.success && response.data) {
            setIdAthlete(response.data);
            return {
                success: true,
                data: response.data
            }
        } else {
            console.log(Error)
            return {
                success: false,
                data: null
            }
        }
    }

 

    // Søk athlete på name 
    const fetchAthleteByName = async (name: string) => {
        const response = await AthleteService.getAthleteByName(name);
        if (response.success && response.data) {
            setNameAthletes(response.data);
        } else {
            console.log(Error)
        }
    }

    // TODO: Put/edit athlete
const putAthlete = async (editedAthlete: IAthlete, image: File | null): Promise<IDefaultResponse> => {
    try {
        // Always PUT the athlete object first
        const response = await AthleteService.putAthlete(editedAthlete, image);

        if (response.success && response.data) {
            // Update local athlete list
            setAthletes(prev =>
                prev.map(a =>
                    a.id === editedAthlete.id ? response.data : a
                )
            );
        }

        return response;

    } catch (error) {
        return { success: false,};
    }
};

const putPurchasedTrue = async (purchasedAthlete: IAthlete): Promise<IDefaultResponse> => {
    try {
        const response = await AthleteService.putAthlete(purchasedAthlete, null);

        if (response.success && response.data) {
            // Update local athlete list
            setAthletes(prev =>
                prev.map(a =>
                    a.id === purchasedAthlete.id ? response.data : a
                )
            );
        }
        return response;
    } catch (error) {
        return { success: false };  
    }
}


    //delete athelete
    const deleteAthelete = async (id: number) : Promise<IDefaultResponse> => {
        const response = await AthleteService.deleteAthlete(id);
        if (response.success) {
            //oppdatere listen om sletting var vellykket
            setAthletes(prev => prev.filter (a => a.id !== id));
        }
        return response;
    };

    // POST
    const saveAthlete = async (newAthlete: IAthlete, image: File): Promise<IDefaultResponse> => {
        const response = await AthleteService.postAthlete(newAthlete, image);
        if (response.success === true && response.data != null) {
            const newAthleteWithId: IAthlete = response.data;
            setAthletes(
                prev => [...prev, newAthleteWithId]
            );
        }
        return response;
    }

    return (
        // Sjekk IAthleteContex
        // Husk å wrap Provider i AppRouting til pages som skal ha tilgang
        <AthleteContext.Provider value={{
            athletes,
            fetchAthleteQuantity,
            fetchAthleteById,
            idAthlete,
            fetchAthleteByName,
            nameAthletes,
            saveAthlete,
            putAthlete,
            deleteAthelete,
            
            putPurchasedTrue
           
        }}>
            {children}
        </AthleteContext.Provider>
    );
}