<template>
    <div class="card-function-bar">
        <card-function-btn
            v-if="!isAFrozenCard"
            data-cy="freeze-card-button"
            @click="startFreezingCard"
        >
            <template #icon>
                <freeze-card-icon />
            </template>
            Freeze card
        </card-function-btn>
        <card-function-btn v-else data-cy="unfreeze-card-button" @click="startUnfreezingCard">
            <template #icon>
                <freeze-card-icon />
            </template>
            Unfreeze card
        </card-function-btn>
        <card-function-btn @click="setSpendLimitDialogIsOpened = true">
            <template #icon>
                <set-spend-limit-icon />
            </template>
            Set spend limit
        </card-function-btn>
        <card-function-btn>
            <template #icon>
                <g-pay-icon />
            </template>
            Add to GPay
        </card-function-btn>
        <card-function-btn>
            <template #icon>
                <replace-card-icon />
            </template>
            Replace card
        </card-function-btn>
        <card-function-btn @click="startCancelingCard">
            <template #icon>
                <cancel-card-icon />
            </template>
            Cancel card
        </card-function-btn>
        <set-spend-limit-dialog v-model="setSpendLimitDialogIsOpened" />
    </div>
</template>

<script lang="ts" setup>
import CardFunctionBtn from './CardFunctionBtn.vue';
import FreezeCardIcon from '@/assets/svg/freeze-card.svg?component'
import SetSpendLimitIcon from '@/assets/svg/set-spend-limit.svg?component'
import GPayIcon from '@/assets/svg/gpay.svg?component'
import ReplaceCardIcon from '@/assets/svg/replace-card.svg?component'
import CancelCardIcon from '@/assets/svg/cancel-card.svg?component'
import { Dialog } from 'quasar';
import { useMyCardsStore } from 'src/stores/store-card';
import { computed, ref } from 'vue';
import SetSpendLimitDialog from './SetSpendLimitDialog.vue';

const { freezeCard, unfreezeCard, cancelCard, $state } = useMyCardsStore()
const setSpendLimitDialogIsOpened = ref(false)
const isAFrozenCard = computed(() => $state.selectedCard?.status === 'frozen')
const startFreezingCard = () => {
    Dialog.create({
        title: 'Confirmation',
        message: 'You\'re about to freeze this card. Are your sure?',
        ok: {
            label: 'OK',
            color: 'primary',
            'data-cy': "confirm-freeze-card-btn"
        },
        cancel: {
            label: 'Cancel',
            color: 'grey'
        }
    }).onOk(() => {
        freezeCard()
    })
}

const startUnfreezingCard = () => {
    Dialog.create({
        title: 'Confirmation',
        message: 'You\'re about to unfreeze this card. Are your sure?',
        ok: {
            label: 'OK',
            color: 'primary',
            'data-cy': "confirm-unfreeze-card-btn"
        },
        cancel: {
            label: 'Cancel',
            color: 'grey'
        }
    }).onOk(() => {
        unfreezeCard()
    })
}

const startCancelingCard = () => {
    Dialog.create({
        title: 'Confirmation',
        message: 'You\'re about to cancel this card. Are your sure?',
        ok: {
            label: 'OK',
            color: 'primary'
        },
        cancel: {
            label: 'Cancel',
            color: 'grey'
        }
    }).onOk(() => {
        cancelCard()
    })
}
</script>

<style lang="scss">
.card-function-bar {
    @apply px-27px py-5 bg-light-blue rounded-t-3xl grid grid-cols-5 gap-1 lg:rounded-2xl;
}
</style>