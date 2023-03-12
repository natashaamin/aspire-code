<template>
    <q-page class="view-card-page">
        <div class="view-card-page__top-section">
            <div class="view-card-page__top-section__user-balance">
                <balance :balance="3000" />
                <div class="view-card-page__top-section__user-balance__add-new-card">
                    <logo class="view-card-page__top-section__user-balance__add-new-card__logo" />
                    <add-new-card-btn @click="emit('add-new-card')" />
                </div>
            </div>
            <div class="view-card-page__top-section__card-list">
                <card-list-tabs>
                    <my-card-slider :cards="myCards" :key="myCards.length" />
                </card-list-tabs>
            </div>
        </div>
        <div class="view-card-page__card-details">
            <card-function-bar />
            <div class="view-card-page__card-details__content">
                <disclosure>
                    <expansion-btn
                        class="view-card-page__card-details__content__details-btn"
                        disabled
                    >
                        <template #icon>
                            <card-details-icon />
                        </template>
                        Card details
                    </expansion-btn>
                </disclosure>
                <disclosure>
                    <expansion-btn class="view-card-page__card-details__content__details-btn">
                        <template #icon>
                            <transaction-icon />
                        </template>
                        Recent transactions
                    </expansion-btn>
                    <disclosure-panel class="view-card-page__card-details__content__details-panel">
                        <transaction-list />
                    </disclosure-panel>
                </disclosure>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import Balance from 'src/components/Balance.vue'
import { Disclosure, DisclosurePanel } from '@headlessui/vue'
import AddNewCardBtn from 'src/components/AddNewCardBtn.vue'
import Logo from '@/assets/svg/logo.svg?component'
import CardDetailsIcon from '@/assets/svg/card-details.svg?component'
import TransactionIcon from '@/assets/svg/transaction.svg?component'
import CardListTabs from 'src/components/CardListTabs.vue'
import MyCardSlider from 'src/components/MyCardSlider.vue'
import { useMyCardsStore } from 'src/stores/store-card'
import { computed, PropType, watch } from 'vue'
import CardFunctionBar from 'src/components/CardFunctionBar.vue'
import ExpansionBtn from 'src/components/ExpansionBtn.vue'
import TransactionList from 'src/components/TransactionList.vue'
import { ICard } from 'src/models/cards'

const emit = defineEmits<{ (event: 'add-new-card'): void }>()

defineProps({
    myCards: {
        type: Array as PropType<ICard[]>,
        default: () => []
    }
})


</script>

<style lang="scss">
.view-card-page {
    @apply bg-dark-blue;
    &__top-section {
        @apply sticky top-0 z-0 px-6 py-30px;
        &__user-balance {
            @apply flex flex-nowrap justify-between items-end mb-26px;
            &__add-new-card {
                @apply flex flex-col;
                &__logo {
                    @apply text-brand relative -top-25px self-end;
                }
            }
        }
    }

    &__card-details {
        @apply sticky z-1 bg-white rounded-t-3xl flex flex-col;
        height: calc(100vh - 60px);
        &__content {
            @apply p-6 pb-86px h-full overflow-auto;
            &__details-btn {
                @apply relative z-1;
                &:not(:first-child) {
                    @apply mt-6;
                }
            }
            &__details-panel {
                @apply z-0 relative -top-2.5;
            }
        }
    }
}
</style>
