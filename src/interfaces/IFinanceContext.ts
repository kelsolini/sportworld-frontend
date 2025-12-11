import type { IFinance } from "./IFinance";

export interface IFinanceContext {
    finance: IFinance | null,
    fetchFinance: () => Promise<IFinance | null>,
    updateFinance: (updatedFinance: IFinance) => Promise<IFinance | null>
}