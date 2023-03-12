<template>
  <div class="apply__panel">
    <div v-if="!checkout" class="apply__loan-card">
      <div class="text-h5 q-pb-lg text-center text-grey-9">Take your first loan with Aspire!</div>
      <div class="q-pb-lg text-center">Fast,easy and convenient.Check it out...</div>
    </div>
    <div v-if="!checkout">
      <div class="text-h6 text-center text-grey-8 q-pb-lg">Enter your Loan details</div>
      <q-form class="add-new-card-dialog__form row q-col-gutter-sm" autofocus @submit="onApplyLoan">
        <div class="col-6">
          <q-input
            outlined
            v-model="loanAmount"
            :model-modifiers="{ number: true }"
            label="Amount required"
            type="number"
            :rules="loanAmountRule"
          />
        </div>
        <div class="col-6">
          <q-select
            outlined
            v-model="loanTerms"
            :options="loanTermsList"
            :rules="loanTermsRule"
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-select>
        </div>
        <div class="col-6">
          <q-input
            class="q-mb-lg"
            outlined
            disable
            v-model="loanFrequency"
            label="Loan Frequency"
            type="text"
            readonly
          />
        </div>
        <div class="col-12 q-mt-md">
          <q-btn
            color="primary"
            class="add-new-card-dialog__form__submit-btn"
            type="submit"
            unelevated
            size="md"
            >Add now</q-btn
          >
        </div>
      </q-form>
    </div>
    <div v-if="checkout" class="success__form text-center">
      <Tick class="bg-green-3 q-ml-md" style="border-radius: 50%" />

      <div class="text-h6 text-center text-grey-7">Great !!!</div>
      <div class="text-h6 text-center text-grey-7">Loan Success</div>
      <q-separator class="q-mt-lg" style="width: 100%" />
      <div class="text-grey-8 text-bold q-pa-xs">Loan Summary</div>

      <q-card>
        <q-card-section>
          <div class="grid-container">
            <div class="grid-label">
              <div>Purpose Loan</div>
              <div>Monthly</div>
              <div>Installment</div>
              <div>Due date</div>
            </div>
            <div class="grid-label">
              <div>Car Loan</div>
              <div>12 Month</div>
              <div>S$ 10/month</div>
              <div>May 10,2021</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tick from '@/assets/svg/done.svg?component'
import { Notify } from 'quasar'
import { useLoanTransactionApi } from 'src/services/loan'
import { useLoanStore } from 'src/stores/store-loan'
import { computed, ref, onMounted, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const { $state, setLoanDetails, setLoanApproval } = useLoanStore()
const { applyNewLoan } = useLoanTransactionApi()

const checkout = ref(false)
const loanFrequency = ref<any>('Monthly')
const loanAmount = ref<any>(0)
const loanTerms = ref<any>(0)
const loanTermsList = ref([
  { label: '1 Year', value: '1' },
  { label: '2 Year', value: '2' },
  { label: '3 Year', value: '3' }
])
const loanId = ref<any>(0)
const loanPaid = ref<any>(0)

const loansDetails = computed(() => $state.loans)
const loanAmountRule = [(value: any) => value != 0 || 'Invalid Amount']
const loanTermsRule = [(value: any) => value != 0 || 'Invalid Amount']


watch(
  () => loansDetails.value,
  (value) => {
    if (value!.length > 0) {
      value?.map((val) => {
        loanAmount.value = val.loanAmount
        loanTerms.value = val.loanTerms
        loanId.value = val.loanId
        loanPaid.value = val.loanPaid
      })
    }
  }
)

watch(() => loanTerms.value, (value) => {
  loanTerms.value = value
})

const onApplyLoan = async () => {
  const result = await applyNewLoan({
    loanId: uuidv4(),
    loanAmount: loanAmount.value,
    loanTerms: loanTerms.value?.value,
    loanPaid: loanPaid.value,
    loanRemain: loanAmount.value,
    listOfRepayment: []
  })

  if (result === 'This loan has already been added') {
    Notify.create({
      message: result,
      type: 'info'
    })
  } else {
    setLoanDetails(result)
    Notify.create({
      message: 'Your loan has been added',
      type: 'positive'
    })
  }

  checkout.value = true
  setLoanApproval(true)
}
</script>

<style lang="scss">
.add-new-card-dialog__form__submit-btn {
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: bold;
}

.apply__panel {
  border: 1px solid #fcfcfc;
  box-shadow: 0px 2px 12px #00000014;
  padding: 30px;
  margin: 20px;

  .apply__btn {
    display: flex;
    justify-content: center;
  }
}

.offer-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.offer-detail {
  background-color: #ddffec;
  color: #01d167;
  border-radius: 6px;
  padding: 8px;
}

.success__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loan__summary {
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: left;

  .label > div {
    line-height: 2;
  }

  .response > div {
    line-height: 2;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.grid-label {
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  display: grid;
}

@media (max-width: 600px) {
  .apply__panel {
    margin-right: 0px !important;
  }
}
</style>
