<template>
  <div class="view-card-page-desktop__top-section">
    <div class="view-card-page-desktop__top-section__user-balance">
      <div class="view-card-page-desktop__top-section__user-balance__add-new-card">
        <logo class="view-card-page-desktop__top-section__user-balance__add-new-card__logo" />
        <add-new-loan-btn @click="emit('add-new-loan')" :title="'New Loan'" />
      </div>
    </div>
  </div>

  <div class="account__info-card">
    <div class="personal__details">
      <div class="account__avatar">
        <account-avatar></account-avatar>
      </div>
      <div class="q-pa-md">
        <div class="grid-view">
          <div class="name text-h6 text-indigo-10 q-mb-md">Matthew Mcmahon</div>
          <div class="acc-no text-bold text-grey-8">Account no: xxxx xxxx 4863</div>
          <div class="date text-grey">Member since:20 May,2021</div>
          <div class="loan-status">
            <q-chip square color="primary" text-color="white" icon="event">
              Status:{{ status }}
            </q-chip>
          </div>
        </div>
      </div>
    </div>

    <hr class="vertical-line" />

    <div class="account__detail-cards">
      <div class="detail-card">
        <div class="label text-bold">
          Loan amount
          <Tick
            v-if="loanAmount !== 0 && loanPaid == loanAmount"
            height="20"
            class="bg-green-3 q-ml-md"
            style="border-radius: 50%"
          />
        </div>

        <div class="card-row">
          <div class="icon q-mt-md">
            <ViewCard />
          </div>
          <div class="q-ml-md">
            <span class="text-h6 amt-text"> S$ {{ loanAmount ? loanAmount : '- - -' }}</span>
          </div>
        </div>
      </div>

      <div class="detail-card">
        <div class="label text-bold">Amount Paid</div>
        <div class="card-row">
          <div class="icon q-mt-md bg-indigo-2">
            <Credit />
          </div>
          <div class="q-ml-md">
            <span class="text-h6 amt-text"> S$ {{ loanPaid || '- - -' }}</span>
          </div>
        </div>
      </div>

      <div class="detail-card">
        <div class="label text-bold">Amount Remaining</div>
        <div class="card-row">
          <div class="icon q-mt-md bg-red-2">
            <Payments />
          </div>
          <div class="q-ml-md">
            <span class="text-h6 amt-text"> S$ {{ loanRemain || '- - -' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AccountAvatar from '@/assets/svg/account.svg?component'
import Tick from '@/assets/svg/done.svg?component'
import Credit from '@/assets/svg/credit.svg?component'
import ViewCard from '@/assets/svg/view-card.svg?component'
import Payments from '@/assets/svg/payments.svg?component'
import AddNewLoanBtn from '../components/AddNewCardBtn.vue'
import { ILoans } from 'src/models/loans'
import { useLoanStore } from 'src/stores/store-loan'
import { computed, ref, onMounted, watch } from 'vue'

const { $state, setLoanDetails } = useLoanStore()

const loanAmount = ref(0)
const loanTerms = ref(0)
const loanPaid = ref(0)
const loanRemain = ref(0)
const status = ref('')

const emit = defineEmits<{ (event: 'add-new-loan'): void }>()

const loansDetails = computed({
  get() {
    return $state.loans?.map((value, index) => {
      return {
        loanId: index,
        loanAmount: value?.loanAmount as number,
        loanTerms: value?.loanTerms as number,
        loanPaid: value?.loanPaid as number,
        loanRemain: value?.loanRemain as number
      }
    }) as ILoans[]
  },
  set(newValue: ILoans[]) {
    const config: ILoans[] = newValue?.map((value, index) => {
      return {
        loanId: index,
        loanAmount: value?.loanAmount as number,
        loanTerms: value?.loanTerms as number,
        loanPaid: value?.loanPaid as number,
        loanRemain: value?.loanAmount as number
      }
    })
    setLoanDetails(config)
  }
})

watch(
  () => loansDetails.value,
  (value) => {
    if (value.length > 0) {
      value.map((val) => {
        loanAmount.value = val.loanAmount
        loanTerms.value = val.loanTerms
        loanPaid.value = val.loanPaid
        loanRemain.value = val.loanRemain

        if (val.loanPaid !== 0 && +val.loanPaid === +val.loanAmount) {
          status.value = 'Repaid'
        } else if (val.loanPaid == 0 && +val.loanPaid === +val.loanAmount) {
          status.value = ' NA'
        } else if (val.loanPaid !== 0 && +val.loanPaid !== +val.loanAmount) {
          status.value = ' Pending'
        }
      })
    }
  }
)

const getStatus = () => {
  if (loanPaid.value !== 0 && +loanPaid.value === +loanAmount.value) {
    status.value = 'Repaid'
  } else if (loanPaid.value == 0 && +loanPaid.value === +loanAmount.value) {
    status.value = 'NA'
  } else if (loanPaid.value !== 0 && +loanPaid.value !== +loanAmount.value) {
    status.value = ' Pending'
  }
}

getStatus()
</script>

<style lang="scss" scoped>
.view-card-page-desktop {
  @apply p-60px pb-89.5px;

  &__top-section {
    &__user-balance {
      @apply flex flex-nowrap justify-between items-end mb-26px lg: mb-9;

      &__add-new-card {
        @apply flex flex-col;

        &__logo {
          @apply text-brand relative -top-25px self-end;
        }
      }
    }
  }
}

.vertical-line {
  border-left: 1px solid black;
  height: 300px; /* Change the height to adjust the length of the line */
}

.account__info-card {
  border: 1px solid #fcfcfc;
  box-shadow: 0px 2px 12px #00000014;
  margin-top: 16px;
  display: flex;
  align-items: center;
  // flex-wrap: wrap;
  min-width: 414px;
  padding: 16px;
  overflow: hidden;

  .account__avatar {
    background-color: #0000001f;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.personal__details {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 220px;
}

.grid-view {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.account__detail-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 50%;
  padding: 20px;
  justify-items: center;

  .detail-card {
    border: 1px solid #0000001f;
    border-radius: 16px;
    padding: 10px;
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
  .account__avtar {
    display: none !important;
  }

  .account__info-card {
    padding: 4px !important;
  }

  .account__detail-cards {
    flex-direction: column;
    height: 0px;
    width: 0px;
    padding-bottom: 14px !important;
  }

  .label {
    display: none;
  }

  .detail-card {
    border: 0px !important;
    padding: 0px !important;
    height: 0px;
    width: 0px;
  }

  .card-row {
    width: 200px;
  }

  .amt-text {
    font-size: 16px !important;
    color: grey !important;
  }

  .icon {
    height: 42px !important;
    width: 42px !important;
  }
}
</style>
