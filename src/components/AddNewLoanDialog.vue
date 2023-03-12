<template>
  <q-dialog
    :model-value="modelValue"
    position="standard"
    no-esc-dismiss
    no-backdrop-dismiss
    class
    @update:model-value="toggleDialog($event)"
  >
    <div class="add-new-card-dialog rounded-t-3xl bg-white p-6 relative">
      <div class="add-new-card-dialog__title">Add Loan</div>
      <CloseIcon class="add-new-card-dialog__close-icon" @click="toggleDialog(false)" />
      <apply-for-loan></apply-for-loan>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import CloseIcon from '@/assets/svg/close.svg?component'
import ApplyForLoan from './ApplyForLoan.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'update:model-value', value: boolean): void
}>()

const toggleDialog = (value: boolean) => {
  emit('update:model-value', value)
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
