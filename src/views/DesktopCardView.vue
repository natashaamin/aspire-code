<template>
    <div class="view-card-page-desktop">
        <div class="view-card-page-desktop__top-section">
            <div class="view-card-page-desktop__top-section__user-balance">
                <balance :balance="3000" mode="desktop" />
                <div class="view-card-page-desktop__top-section__user-balance__add-new-card">
                    <logo
                        class="view-card-page-desktop__top-section__user-balance__add-new-card__logo"
                    />
                    <add-new-card-btn @click="emit('add-new-card')" :title="'New Card'"/>
                </div>
            </div>
        </div>
        <div class="view-card-page-desktop__main-content">
            <card-list-tabs>
                <div
                    ref="mainContentRef"
                    :class="[
                        'view-card-page-desktop__main-content__card',
                        { 'view-card-page-desktop__main-content__card--column': isColumnLayout }
                    ]"
                >
                    <div
                        :class="[
                            'view-card-page-desktop__main-content__card__info',
                            { 'view-card-page-desktop__main-content__card--column__info': isColumnLayout }
                        ]"
                    >
                        <my-card-slider :cards="myCards" :key="myCards.length" />
                        <card-function-bar
                            class="view-card-page-desktop__main-content__card__info__function-bar"
                        />
                    </div>
                    <div
                        :class="[
                            'view-card-page-desktop__main-content__card__details',
                            { 'view-card-page-desktop__main-content__card--column__details': isColumnLayout }
                        ]"
                    >
                        <div class="view-card-page-desktop__main-content__card__details__content">
                            <disclosure>
                                <expansion-btn
                                    class="view-card-page-desktop__main-content__card__details__content__details-btn"
                                    disabled
                                >
                                    <template #icon>
                                        <card-details-icon />
                                    </template>
                                    Card details
                                </expansion-btn>
                            </disclosure>
                            <disclosure>
                                <expansion-btn
                                    class="view-card-page-desktop__main-content__card__details__content__details-btn"
                                >
                                    <template #icon>
                                        <transaction-icon />
                                    </template>
                                    Recent transactions
                                </expansion-btn>
                                <disclosure-panel
                                    class="view-card-page-desktop__main-content__card__details__content__details-panel"
                                >
                                    <transaction-list />
                                </disclosure-panel>
                            </disclosure>
                        </div>
                    </div>
                </div>
            </card-list-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Balance from '../components/Balance.vue';
import { Disclosure, DisclosurePanel } from '@headlessui/vue'
import AddNewCardBtn from '../components/AddNewCardBtn.vue';
import MyCardSlider from '../components/MyCardSlider.vue';
import CardListTabs from '../components/CardListTabs.vue';
import { onBeforeUnmount, PropType, ref } from 'vue';
import CardFunctionBar from '../components/CardFunctionBar.vue';
import ExpansionBtn from '../components/ExpansionBtn.vue';
import TransactionList from '../components/TransactionList.vue';
import CardDetailsIcon from '@/assets/svg/card-details.svg?component'
import TransactionIcon from '@/assets/svg/transaction.svg?component'
import { useResizeObserver } from '@vueuse/core';
import { ICard } from 'src/models/cards';

const emit = defineEmits<{ (event: 'add-new-card'): void }>()
const props = defineProps({
    myCards: {
        type: Array as PropType<ICard[]>,
        default: () => []
    }
});

console.log(props.myCards)

const mainContentRef = ref(null)
const isColumnLayout = ref(false)

const mainContentResizeObserver = useResizeObserver(mainContentRef, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    isColumnLayout.value = width <= 860
})

onBeforeUnmount(() => {
    mainContentResizeObserver.stop()
})
</script>


<style lang="scss">
.view-card-page-desktop {
    @apply p-60px pb-89.5px;
    &__top-section {
        &__user-balance {
            @apply flex flex-nowrap justify-between items-end mb-26px lg:mb-9;
            &__add-new-card {
                @apply flex flex-col;
                &__logo {
                    @apply text-brand relative -top-25px self-end;
                }
            }
        }
    }

    &__main-content {
        &__card {
            @apply p-10 pt-60px bg-white rounded-lg flex;
            filter: drop-shadow(0 0 2px #00000014);
            &__info {
                @apply w-1/2;
                &__function-bar {
                    @apply mt-8;
                }
            }

            &__details {
                @apply w-1/2 sticky z-1 bg-white rounded-t-3xl flex flex-col;
                &__content {
                    @apply p-6 pr-0 pt-43px overflow-auto;
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

            &--column {
                @apply flex-col pt-0;
                &__info {
                    @apply w-[60%] mx-auto;
                }
                &__details {
                    @apply w-full;
                }
            }
        }
    }
}
</style>