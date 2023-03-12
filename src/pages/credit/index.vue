<template>
  <q-layout class="q-pa-lg">
    <account-info-card ></account-info-card>
    <add-new-loan-dialog v-model="toggleDialog" />
    <loan-transaction :loan-is-approved="isLoanApprovedRef" @add-new-loan="toggleDialog = true"></loan-transaction>
  </q-layout>
</template>

<script lang="ts" setup>
import AccountInfoCard from '@/components/AccountInfoCard.vue'
import AddNewLoanDialog from 'src/components/AddNewLoanDialog.vue'
import LoanTransaction from 'src/components/LoanTransaction.vue'
import { ILoans } from 'src/models/loans'
import { useLoanStore } from 'src/stores/store-loan'
import { useUtils } from 'src/utils/useUtils'
import { computed, ref, watch, onMounted, toRef } from 'vue'

const { $state, setLoanDetails, loadLoans } = useLoanStore()
const { formatDates, formatMoney } = useUtils()

const updatedList = ref<any>([])
const toggleDialog = ref(false)
const isLoanApprovedRef = ref(false)

const isLoanApproved = computed(() => $state.isLoanApproved)
watch(() => isLoanApproved.value, (value) => { isLoanApprovedRef.value = value })

const loan = computed(() => $state.loans)

watch(() => loan.value, (value)=> {
  console.log(value, 'meow')
})

loadLoans()
</script>

<style lang="scss">
.account__info-card {
  border: 1px solid #fcfcfc;
  box-shadow: 0px 2px 12px #00000014;
  margin-top: 16px;
  display: flex;
  padding: 16px;

  .account__avtar {
    background-color: #0000001f;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.no__transaction {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.personal__details {
  display: flex;
  width: 40%;
}

.account__detail-cards {
  width: 100%;
  display: flex;
  justify-content: space-around;

  .detail-card {
    border: 1px solid #0000001f;
    border-radius: 16px;
    padding: 16px;
    width: 162px;
    height: 122px;

    .card-row {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.icon {
  background-color: #ddffec;
  height: 52px;
  width: 52px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
}
</style>
