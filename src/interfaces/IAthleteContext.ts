import type { IAthlete } from "./IAthlete";
import type { IDefaultResponse, IAthleteSingelResponse } from "./ResponseInterfaces";

export interface IAthleteContext {
    athletes: IAthlete[],
    fetchAthleteQuantity: () => number,
    fetchAthleteById: (id: number) => void,
    idAthlete: IAthlete | null,
    fetchAthleteByName: (name: string) => void,
    nameAthletes: IAthlete[],
    saveAthlete: (athlete: IAthlete, image: File) => Promise<IDefaultResponse>
}