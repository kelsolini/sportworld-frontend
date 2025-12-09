import { useState, createContext, type ReactNode, useEffect } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import type { IAthleteContext } from "../interfaces/IAthleteContext";
import AthleteService from "../services/AthleteService";
import type { IDefaultResponse } from "../interfaces/ResponseInterfaces";

export const AthleteContext = createContext<IAthleteContext | null>(null);

interface Props {children: ReactNode}

export const AthleteProvider = ({children} : Props) => {

    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [idAthlete, setIdAthlete] = useState<IAthlete | null>(null);
    const [nameAthletes, setNameAthletes] = useState<IAthlete[]>([]);


    const setAthletesFromService = async () => {
        const response = await AthleteService.getAllAthletes();
        if(response.success && response.data){
            setAthletes(response.data);
        }else{
            console.log(Error)
        }
    }

    useEffect(()=>{
        setAthletesFromService();
    }, [])

    // Athlete quantity
    const fetchAthleteQuantity = () : number => {
        return athletes.length;
    }

    // Søk athlete på id
    const fetchAthleteById = async (id: number) => {
        const response = await AthleteService.getAthleteById(id);
        if(response.success && response.data){
            setIdAthlete(response.data);
        }else{
            console.log(Error)
        }
    }

    // Søk athlete på name 
    const fetchAthleteByName = async (name: string) => {
        const response = await AthleteService.getAthleteByName(name);
        if(response.success && response.data){
            setNameAthletes(response.data);
        }else{
            console.log(Error)
        }
    }

    // TODO: Put/edit athlete

    const editAthlete = async (updatedAthlete: IAthlete) : Promise<IDefaultResponse> => {
        const response = await AthleteService.editAthlete(updatedAthlete);
        if(response.success && response.data){
            setAthletes(
                prev => [updatedAthlete, ...prev]
            );
        }
        return response;
    }

    // POST

    const saveAthlete = async (newAthlete: IAthlete, image: File) : Promise<IDefaultResponse> => {
        const response = await AthleteService.postAthlete(newAthlete, image);
        if(response.success === true && response.data != null){
            const newAthleteWithId : IAthlete = response.data;
            setAthletes(
                prev => [newAthleteWithId, ...prev]
            );
        }
        return response;
    }

     // Legg til fighter med bilde
  
    // DELETE

    return(
        // Sjekk IAthleteContex
        // Husk å wrap Provider i AppRouting til pages som skal ha tilgang
        <AthleteContext.Provider value={{athletes, fetchAthleteQuantity, fetchAthleteById, idAthlete, fetchAthleteByName, nameAthletes, saveAthlete}}>
            {children}
        </AthleteContext.Provider>
    );
}