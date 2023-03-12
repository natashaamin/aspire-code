<template>
    <div class="transaction-list-wrapper">
        <div class="transaction-list-wrapper__content">
            <template v-for="(tx, index) in transactions" :key="index">
                <transaction-item :transaction="tx"></transaction-item>
                <hr
                    v-if="index < transactions.length - 1"
                    class="transaction-list-wrapper__content__separator"
                />
            </template>
            <div
                v-if="!transactions.length"
                class="transaction-list-wrapper__content__empty"
            >There's no transactions</div>
        </div>
        <button class="transaction-list-wrapper__view-more-button">View all card transactions</button>
    </div>
</template>

<script lang="ts" setup>
import { useMyCardsStore } from 'src/stores/store-card';
import { computed } from 'vue';
import TransactionItem from './TransactionItem.vue';

const { $state } = useMyCardsStore()

const transactions = computed(() => $state.transactions)
</script>

<style lang="scss">
.transaction-list-wrapper {
    &__content {
        @apply p-6 pt-34px rounded-lg border border-grey-1 bg-white relative z-1;
        &__separator {
            @apply my-4 border-grey-1;
        }
        &__empty {
            @apply text-center;
        }
    }
    &__view-more-button {
        @apply prose-3 font-semibold text-center;
        @apply text-brand py-4 pt-8 rounded-lg bg-light-green-1;
        @apply -top-5 z-0 relative w-full;
    }
}
</style>
