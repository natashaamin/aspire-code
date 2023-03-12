import { ITransaction } from "src/models/transaction"
import { transactions } from "./data"

export const useTransactionApis = () => {
  const getCardTransactions = (cardId: string) => {
    return new Promise<ITransaction[]>((resolve, reject) => {
      const cardTransactions = transactions.filter((tx) => tx.cardId === cardId)
      resolve(cardTransactions)
    })
  }
  return {
    getCardTransactions,
  }
}
