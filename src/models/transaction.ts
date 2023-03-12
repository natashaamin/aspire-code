export interface ITransaction {
  id: string
  cardId: string
  transactionDate: number
  type: 'charged' | 'refund'
  category: 'travel' | 'grocery' | 'notice'
  recipient: string
  amount: number
}
