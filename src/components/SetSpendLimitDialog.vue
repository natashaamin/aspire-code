<template>
    <q-dialog
        :model-value="modelValue"
        position="bottom"
        class
        no-esc-dismiss
        no-backdrop-dismiss
        no-shake
        @update:model-value="toggleDialog($event)"
    >
        <div class="set-spend-limit-dialog">
            <div class="set-spend-limit-dialog__title">Set Spend Limit</div>
            <CloseIcon class="set-spend-limit-dialog__close-icon" @click="toggleDialog(false)" />
            <q-form
                class="set-spend-limit-dialog__form row q-col-gutter-sm"
                @submit="() => {
                    setSpendLimit(spendLimit)
                    toggleDialog(false)
                }"
            >
                <div class="col-12">
                    <q-input
                        v-model="spendLimit"
                        outlined
                        autocapitalize="words"
                        autofocus
                        prefix="S$"
                        mask="#.##"
                        reverse-fill-mask
                        fill-mask="0"
                        input-class="text-right prose-"
                        class="prose-xl"
                        inputmode="numeric"
                    />
                </div>
                <div class="col-12 q-mt-md">
                    <q-btn
                        color="primary"
                        class="set-spend-limit-dialog__form__submit-btn"
                        type="submit"
                        unelevated
                        size="md"
                    >Save</q-btn>
                </div>
            </q-form>
        </div>
    </q-dialog>
</template>

<script lang="ts" setup>
import { useMyCardsStore } from 'src/stores/store-card';
import { computed, ref, watch } from 'vue';
import CloseIcon from '@/assets/svg/close.svg?component'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits<{
    (event: 'update:model-value', value: boolean): void
}>()

const { $state, setSpendLimit } = useMyCardsStore()
const spendLimit = ref()
const selectedCard = computed(() => $state.selectedCard)
const toggleDialog = (value: boolean) => {
    emit('update:model-value', value)
}


watch(() => props.modelValue, (value) => {
    if (value) {
        spendLimit.value = selectedCard.value?.spendLimit || 0
    }
})
</script>

<style lang="scss">
.set-spend-limit-dialog {
    @apply rounded-t-3xl #{!important};
    @apply bg-white p-6 relative;
    &__title {
        @apply text-center prose-16 font-medium mb-6;
    }
    &__close-icon {
        @apply absolute top-3 right-3 cursor-pointer;
    }
    &__form {
        &__submit-btn {
            @apply w-full py-2 font-bold #{!important};
        }
    }
}
</style>
