import type { IVenue } from "./IVenue";
import type { IDefaultResponse, IVenueSingelResponse } from "./ResponseInterfaces";

export interface IVenueContext {
    venues: IVenue[],
    fetchVenueQuantity: () => number,
    fetchVenueById: (id: number) => Promise<IVenueSingelResponse>,
    idVenue: IVenue | null,
    fetchVenueByName: (name: string) => void,
    nameVenues: IVenue[],
    saveVenue: (venue: IVenue, image: File) => Promise<IDefaultResponse>,
    putVenue: (updatedVenue: IVenue, image: File) => Promise<IDefaultResponse>,
}
