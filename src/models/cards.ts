export interface ICard {
  id: string
  cardHolder: string
  cardnumber: string
  cvv: string
  expiryDate: string
  status: 'frozen' | 'active' | 'canceled'
  spendLimit?: number
}
