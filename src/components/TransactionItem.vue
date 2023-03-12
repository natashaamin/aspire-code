<template>
    <div class="transaction-item">
        <div
            :class="[
                'transaction-item__category',
                `transaction-item__category--${transaction.category}`
            ]"
        >
            <component :is="categoryIcon"></component>
        </div>
        <div class="transaction-item__details">
            <div class="transaction-item__details__info">
                <div class="transaction-item__details__info__recipient">
                    <div
                        class="transaction-item__details__info__recipient__name"
                    >{{ transaction.recipient }}</div>
                    <div
                        :class="
                            [
                                'transaction-item__details__info__recipient__transaction-amount',
                                `transaction-item__details__info__recipient__transaction-amount--${transaction.type}`
                            ]
                        "
                    >
                        {{ formattedTxAmount }}
                        <chevron-right-icon
                            class="transaction-item__details__info__recipient__transaction-amount__chevron-right"
                        />
                    </div>
                </div>
                <div class="transaction-item__details__info__transaction-date">{{ formattedTxDate }}</div>
            </div>
            <div class="transaction-item__details__type">
                <div class="transaction-item__details__type__icon">
                    <credit-card-icon />
                </div>
                {{ formattedTxTypeMsg }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import GroceryIcon from '@/assets/svg/grocery.svg?component'
import TravelIcon from '@/assets/svg/travel.svg?component'
import NoticeIcon from '@/assets/svg/notice.svg?component'
import CreditCardIcon from '@/assets/svg/credit-card.svg?component'
import ChevronRightIcon from '@/assets/svg/chevron-right.svg?component'
import { computed, PropType } from 'vue';
import { ITransaction } from 'src/models/transaction'
import { useUtils } from 'src/utils/useUtils'

const props = defineProps({
    transaction: {
        type: Object as PropType<ITransaction>,
        required: true
    }
})

const { formatDates, formatMoney } = useUtils()

const formattedTxDate = computed(() => formatDates(props.transaction.transactionDate))
const formattedTxAmount = computed(() => `${props.transaction.type === 'charged' ? '- ' : '+ '}S$ ${formatMoney(props.transaction.amount)}`)
const formattedTxTypeMsg = computed(() => `${props.transaction.type === 'charged' ? 'Charged to' : 'Refund to'} debit card`)
const categoryIcon = computed(() => {
    switch (props.transaction.category) {
        case 'grocery':
            return GroceryIcon
        case 'notice':
            return NoticeIcon
        case 'travel':
            return TravelIcon
        default:
            return GroceryIcon
    }
})


</script>

<style lang="scss">
.transaction-item {
    @apply flex;
    &__category {
        @apply p-4 rounded-full flex items-center justify-center w-12 h-12 mr-3;
        &--grocery {
            @apply bg-light-blue-2;
        }
        &--travel {
            @apply bg-light-green-2;
        }
        &--notice {
            @apply bg-light-red;
        }
    }
    &__details {
        @apply w-full;
        &__info {
            @apply prose-9;
            &__recipient {
                @apply flex justify-between w-full  mb-1;
                &__name {
                    @apply font-semibold;
                }
                &__transaction-amount {
                    @apply flex items-center;
                    &__chevron-right {
                        @apply ml-2.5;
                    }
                    &--charged {
                        @apply text-black;
                    }
                    &--refund {
                        @apply text-brand;
                    }
                }
                @apply font-bold;
            }
            &__transaction-date {
                @apply text-grey-2;
            }
        }
        &__type {
            @apply prose-14 font-semibold text-dark-blue-1 flex items-center mt-14px;
            &__icon {
                @apply w-6 h-5 bg-dark-blue-1 flex items-center justify-center rounded-xl mr-2;
            }
        }
    }
}
</style>
