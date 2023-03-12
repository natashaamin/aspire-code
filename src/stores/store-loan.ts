import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import { ILoans } from 'src/models/loans'
import { useLoanTransactionApi } from 'src/services/loan'
import { ref } from 'vue'

export const useLoanStore = defineStore('loan-store', () => {
  const { getLoanList, updateLoan } = useLoanTransactionApi()
  const loans = ref<ILoans[]>([])
  const isLoanApproved = ref(false)

  const loadLoans = async () => {
    const myLoans = await getLoanList()
    setLoanDetails(myLoans)
  }

  const setLoanDetails = (details: ILoans[]) => {
    loans.value = [...details].filter((c: any) => c.loanId != 0)
  }

  const setLoanApproval = (status: any) => {
    isLoanApproved.value = status
  }

  const updateLoanDetails = (id: any, loanRemain: any, loanPaid: any) => {
    const updatedArray = loans.value.map(item => item.loanId === id ? { ...item, loanRemain: loanRemain, loanPaid: loanPaid } : item);
    console.log(updatedArray,"hello")
    if (updatedArray) {
      updateLoan(id, updatedArray as any)
      Notify.create({
        message: 'Your details have been updated.',
        type: 'positive'
      })
    } else {
      Notify.create({
        message: 'Unable to update.',
        type: 'positive'
      })
    }
  }

  return {
    loans,
    isLoanApproved,
    loadLoans,
    setLoanDetails,
    setLoanApproval,
    updateLoanDetails
  }
})
