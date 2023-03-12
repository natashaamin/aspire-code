import { ILoans } from 'src/models/loans'
import { loans } from './data'

export const useLoanTransactionApi = () => {
  const saveLoanTransactionToLocalStorage = (loan: ILoans[]) => {
    localStorage.setItem('my-loan', JSON.stringify(loan))
  }

  const getLoanList = () => {
    return new Promise<ILoans[]>((resolve, _) => {
      const localStoredCards = localStorage.getItem('my-loans')
      let myLoan: ILoans[] = []
      if (localStoredCards) {
        myLoan = JSON.parse(localStoredCards) as ILoans[]
      } else {
        myLoan = loans
        saveLoanTransactionToLocalStorage(loans)
      }
      resolve(myLoan)
    })
  }

  const applyNewLoan = async (data: Required<ILoans>) => {
    const getLoans = [...(await getLoanList())]
    const isExisted = getLoans.find((loan) => loan.loanId == data.loanId)
    if (!isExisted) {
      getLoans.unshift(data)
      saveLoanTransactionToLocalStorage(getLoans)
    } else {
      return 'This loan has already been added'
    }
    return getLoans
  }

  const updateLoan = async (id: string, data: Partial<ILoans>) => {
    const loans = [...(await getLoanList())]
    const cardToUpdateIdx = loans.findIndex((loan) => loan.loanId === id)
    if (cardToUpdateIdx > -1) {
      loans[cardToUpdateIdx] = {
        ...loans[cardToUpdateIdx],
        ...data,
      }
      saveLoanTransactionToLocalStorage(loans)
    } else {
      return 'This card is not available now. Please try again later.'
    }
  }

  return {
    saveLoanTransactionToLocalStorage,
    getLoanList,
    applyNewLoan,
    updateLoan
  }
}
