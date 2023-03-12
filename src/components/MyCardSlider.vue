<template>
  <tab-panel ref="tabPanelRef" class="my-card-panel">
    <swiper
      class="swiper"
      :slides-per-view="$q.screen.lt.md ? 'auto' : 1"
      centered-slides
      :space-between="16"
      :modules="swiperModules"
      :pagination="{
        el: '.swiper-pagination',
        bulletActiveClass:
          'my-card-panel__pagination__bullet--active swiper-pagination-bullet-active',
        bulletClass: 'my-card-panel__pagination__bullet swiper-pagination-bullet',
        clickable: true,
      }"
    >
      <swiper-slide v-for="(card, index) in cards" :key="index" class="slide-item">
        <Card
          class="my-card-panel__card"
          :card-holder="card.cardHolder"
          :expiry-date="card.expiryDate"
          :card-number="card.cardnumber"
          :cvv="card.cvv"
          :status="card.status"
          @select="selectCard(card)"
        />
      </swiper-slide>
    </swiper>
    <div class="my-card-panel__pagination">
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
  </tab-panel>
</template>

<script lang="ts" setup>
import { TabPanel } from '@headlessui/vue'
import { useResizeObserver } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import { onBeforeUnmount, PropType, Ref, ref } from 'vue'
import Card from './Card.vue'
import 'swiper/css/pagination'
import { useMyCardsStore } from 'src/stores/store-card'
import { ICard } from 'src/models/cards'

defineProps({
  cards: {
    type: Array as PropType<ICard[]>,
    default: () => [],
  },
})

const swiperModules = [Pagination]
const { selectCard } = useMyCardsStore()
const tabPanelRef = ref(null) as unknown as Ref<HTMLElement>
const panelResizeObserver = useResizeObserver(tabPanelRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  const cards = document.getElementsByClassName('my-card-panel__card')
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index] as HTMLElement
    card.style.setProperty('width', `${width - 56}px`)
  }
})

onBeforeUnmount(() => {
  panelResizeObserver.stop()
})
</script>

<style lang="scss">
.my-card-panel {
  &__pagination {
    @apply mt-11px;
    .swiper-pagination {
      @apply relative bottom-0;
    }
    &__bullet {
      @apply bg-brand opacity-10 transition-all duration-300;
      &--active {
        @apply opacity-100 w-4 rounded-lg;
      }
    }
  }
}
.slide-item {
  @apply <lg:w-[fit-content] #{!important};
}
</style>
