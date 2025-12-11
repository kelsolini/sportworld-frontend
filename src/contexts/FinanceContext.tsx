import { createContext } from "react";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinanceContext } from "../interfaces/IFinanceContext";

export const FinanceContext = createContext<IFinanceContext>({
    finance: { id: 0, moneyLeft: 0, numberOfPurchases: 0, moneySpent: 0 },
    fetchFinance: async () => null,
    updateFinance: async (updatedFinance: IFinance) => null
})
