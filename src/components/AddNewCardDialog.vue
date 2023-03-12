<template>
  <q-dialog
    :model-value="modelValue"
    position="top"
    no-esc-dismiss
    no-backdrop-dismiss
    class
    @update:model-value="toggleDialog($event)"
  >
    <div class="add-new-card-dialog rounded-t-3xl bg-white p-6 relative">
      <div class="add-new-card-dialog__title">Add Card</div>
      <CloseIcon class="add-new-card-dialog__close-icon" @click="toggleDialog(false)" />
      <card
        new-card
        class="add-new-card-dialog__card"
        :card-holder="cardHolder || undefined"
        :card-number="cardnumber || undefined"
        :cvv="cvv || undefined"
        :expiry-date="expiryDate || undefined"
      />
      <q-form class="add-new-card-dialog__form row q-col-gutter-sm" autofocus @submit="addCard">
        <div class="col-12">
          <q-input
            v-model="cardHolder"
            outlined bottom-slots
            label="Cardholder name"
            autocapitalize="words"
            :rules="cardHolderRules"
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="cardnumber"
            outlined
            label="Card number"
            inputmode="numeric"
            mask="#### #### #### ####"
            :rules="cardnumberRules"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="expiryDate"
            outlined
            label="Valid thru"
            inputmode="numeric"
            mask="##/##"
            :rules="expiryDateRules"
          />
        </div>
        <div class="col-6">
          <q-input
            v-model="cvv"
            outlined
            label="Security code (CVV)"
            inputmode="numeric"
            mask="###"
            :rules="cvvRules"
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
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import CloseIcon from '@/assets/svg/close.svg?component'
import validateCard from 'card-validator'
import Card from './Card.vue'
import { useCardApis } from 'src/services/card'
import { Notify } from 'quasar'
import { useMyCardsStore } from 'src/stores/store-card'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'update:model-value', value: boolean): void
}>()

const { addNewCard } = useCardApis()
const { setCards } = useMyCardsStore()
const cardnumber = ref('')
const cardHolder = ref('')
const expiryDate = ref('')
const cvv = ref('')

const expiryMonth = computed(() => expiryDate.value.slice(0, 2))
const expiryYear = computed(() => expiryDate.value.slice(3))

const cardHolderRules = [
  (value: string) => validateCard.cardholderName(value).isValid || 'Invalid cardholder name'
]
const cardnumberRules = [
  (value: string) =>
    validateCard.number(value).isValid ||
    validateCard.number(value).isValid ||
    'Invalid card number'
]
const expiryDateRules = [
  () =>
    (Number(expiryMonth.value) && Number(expiryMonth.value) <= 12) ||
    validateCard.expirationYear(expiryYear.value).isValid ||
    'Invalid expiration date'
]
const cvvRules = [(value: string) => validateCard.cvv(value).isValid || 'Invalid CVV']

const toggleDialog = (value: boolean) => {
  emit('update:model-value', value)
}

const addCard = async () => {
  const result = await addNewCard({
    id: cardnumber.value,
    cardHolder: cardHolder.value,
    cardnumber: cardnumber.value,
    cvv: cvv.value,
    expiryDate: expiryDate.value,
    status: 'active',
    spendLimit: 1000000
  })

  if (result === 'This card has already been added') {
    Notify.create({
      message: result,
      type: 'info'
    })
  } else {
    setCards(result)
    toggleDialog(false)
    Notify.create({
      message: 'Your card has been added',
      type: 'positive'
    })
  }
}
</script>

<style lang="scss">
.add-new-card-dialog__title {
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.add-new-card-dialog__input {
  border: 1px solid gray;
}

.add-new-card-dialog__close-icon {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  cursor: pointer;
}

.add-new-card-dialog__card {
  max-width: 22.375rem;
  margin: 0 auto;
  margin-bottom: 1.5rem;
}

.add-new-card-dialog__form__submit-btn {
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: bold;
}

</style>
