import { ICard } from "src/models/cards"
import { ILoans } from "src/models/loans"
import { ITransaction } from "src/models/transaction"

export const cards: ICard[] = [
  {
    id: '7AB398CC-61C4-530B-8776-25598C77882E',
    cardHolder: 'Matthew Mcmahon',
    cardnumber: '5163 3911 8667 4863',
    cvv: '604',
    expiryDate: '03/21',
    status: 'active',
  },
  {
    id: '221C1A7F-9F94-2816-973B-D0769D2BDEE3',
    cardHolder: 'Trevor Rios',
    cardnumber: '4532 7362 3427 1381',
    cvv: '460',
    expiryDate: '03/21',
    status: 'active',
  },
  {
    id: '8B91942A-3F14-3DEF-E45E-9DAB3E35C579',
    cardHolder: 'Boris Moon',
    cardnumber: '4539 2355 5673 1224',
    cvv: '758',
    expiryDate: '03/21',
    status: 'active',
  },
  {
    id: 'DDBE981D-5E2B-62F2-26A4-85365971BADF',
    cardHolder: 'Ahmed Lowe',
    cardnumber: '4769 7663 6245 6540',
    cvv: '733',
    expiryDate: '03/21',
    status: 'active',
  },
  {
    id: '8C4B4D6D-4E3C-C7B2-220B-51E411BFA749',
    cardHolder: 'Raymond Garrett',
    cardnumber: '5381 4164 3728 1634',
    cvv: '576',
    expiryDate: '03/21',
    status: 'active',
  },
]

export const transactions: ITransaction[] = [
  {
    id: '1E53BD18-8D47-C33D-67E0-7687AEE47D4B',
    cardId: '221C1A7F-9F94-2816-973B-D0769D2BDEE3',
    transactionDate: 1612573299000,
    type: 'charged',
    category: 'travel',
    recipient: 'Dean Alford',
    amount: 231,
  },
  {
    id: '849FA56E-ACA2-B2CB-9D54-A873A813AD59',
    cardId: '8B91942A-3F14-3DEF-E45E-9DAB3E35C579',
    transactionDate: 1613698742000,
    type: 'charged',
    category: 'grocery',
    recipient: 'Kenyon Nixon',
    amount: 356,
  },
  {
    id: 'DF4C826E-8058-1107-B718-3A367A5B758B',
    cardId: '221C1A7F-9F94-2816-973B-D0769D2BDEE3',
    transactionDate: 1611434141000,
    type: 'refund',
    category: 'travel',
    recipient: 'Nayda Chambers',
    amount: 351,
  },
  {
    id: 'B17BCF30-1609-1D2C-3A66-E945E1CE5248',
    cardId: '221C1A7F-9F94-2816-973B-D0769D2BDEE3',
    transactionDate: 1613004289000,
    type: 'refund',
    category: 'notice',
    recipient: 'Eliana Mills',
    amount: 14,
  },
  {
    id: '49BC30E5-B8FD-86F1-31DE-ACAFDAD1A4C6',
    cardId: '7AB398CC-61C4-530B-8776-25598C77882E',
    transactionDate: 1610267554000,
    type: 'refund',
    category: 'notice',
    recipient: 'Magee Sweeney',
    amount: 429,
  },
]

export const loans: ILoans[] = [{
  loanId: 0,
  loanAmount:0,
  loanTerms:1,
  loanPaid:0,
  loanRemain:0,
  listOfRepayment: []
}]