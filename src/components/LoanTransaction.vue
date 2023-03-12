<template>
  <div v-if="!loanIsApproved" class="no__transaction">
    <div>
      <img
        height="300"
        width="400"
        src="https://image.freepik.com/free-vector/plain-credit-card-concept-illustration_114360-199.jpg"
        alt=""
      />
    </div>
    <div class="text-h6 text-grey-8">No Transactions</div>
  </div>

  <div v-else class="loan__repayments">
    <div v-for="(term, i) in repaymentList" :key="i" class="repayment__card q-mb-md">
      <div class="col">
        <div>
          <q-badge v-show="term?.paid" color="green-3"> Repaid </q-badge>
        </div>
        <div>
          <q-badge v-show="!term?.paid" color="red-3"> Unpaid </q-badge>
        </div>
        <div>Amount:- {{ term?.amount?.toFixed(2) }}</div>
        <div class="text-grey-8">Due date:- {{ term?.date }}</div>
      </div>

      <div class="col-3">
        <q-btn @click="hasPaid(term.loanId)" v-if="!term.paid" outline rounded color="primary" label="Repay" />
        <div v-else>
          <Tick class="bg-green-3 q-ml-md" style="border-radius: 50%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tick from '@/assets/svg/done.svg?component'
import { useLoanTransactionApi } from 'src/services/loan'
import { useLoanStore } from 'src/stores/store-loan'
import { useUtils } from 'src/utils/useUtils'
import { computed, onBeforeMount, onUpdated, ref, watch, onMounted, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { ILoans } from 'src/models/loans'

const { $state, updateLoanDetails, loadLoans } = useLoanStore()
const { formatDates, formatMoney } = useUtils()
const { applyNewLoan, updateLoan } = useLoanTransactionApi()

defineProps({
  loanIsApproved: {
    type: Boolean,
    default: false
  }
})

const repaymentList = ref<any>([])
const loan = reactive({
  loanId: 0,
  loanAmount: 0,
  loanTerms: 0,
  loanRemain: 0,
})

const loans = computed(() => $state.loans)

onUpdated(() => {
  loans?.value?.forEach((val) => {
    loan.loanId = val.loanId
    loan.loanAmount = val.loanAmount
    loan.loanTerms = val.loanTerms
    loan.loanRemain = val.loanRemain
  })
})

watch(() => [loan.loanAmount], ([loanAmount]) => {
  const newRepaymentList = getRepaymentList(loanAmount, loan.loanTerms, loan.loanId)
  repaymentList.value.push(...newRepaymentList)
})

const getRepaymentList = (loanAmount: number, loanTerms: number, loanId: any) => {
  const repaymentList = []
  for (let i = 0; i < loanTerms; i++) {
    const repaymentObj = {
      id: loanId,
      amount: loanAmount / loanTerms,
      paid: false,
      date: formatDates(Date.now())
    }
    repaymentList.push(repaymentObj)
  }
  return repaymentList
}

const hasPaid = (loanId: any) => {
  console.log(repaymentList,"hello")

  const res = repaymentList.value.find((c: ILoans) => c.loanId === loanId);

  let newLoanRemain: any = (loan.loanRemain - res.amount).toFixed(2)
  let newLoanPaid: any = (loan.loanAmount - loan.loanRemain).toFixed(2)
  if (newLoanRemain < 1) {
    newLoanRemain = 0
    newLoanPaid = loan.loanAmount
  }

  console.log(loanId,newLoanRemain, newLoanPaid,"hello")


  updateLoanDetails(loanId, newLoanRemain, newLoanPaid)

  // setLoanDetails(result)
  res.paid = true
}
</script>

<style lang="scss">
.loan__panel {
  width: 60%;
  border: 1px solid #fcfcfc;
  box-shadow: 0px 2px 12px #00000014;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  padding: 28px;
  min-width: 414px;
  overflow: hidden;
}

.no__transaction {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loan__repayments {
  width: 80%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .repayment__card {
    width: 80%;
    border: 1px solid #0000001f;
    padding: 16px 12px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
  }
}

@media (max-width: 600px) {
  .loan__panel {
    padding: 8px 0px;
  }
}
</style>
