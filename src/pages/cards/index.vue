<template>
  <div>
    <the-mobile-cards-page
      v-if="$q.screen.lt.md"
      @add-new-card="addNewCardDialogIsOpened = true"
      :my-cards="myCards"
    />
    <the-desktop-cards-page
      v-else
      @add-new-card="addNewCardDialogIsOpened = true"
      :my-cards="myCards"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TheMobileCardsPage from 'src/views/MobileCardView.vue'
import TheDesktopCardsPage from 'src/views/DesktopCardView.vue'
import { useMyCardsStore } from 'src/stores/store-card';
const { $state, loadCards, loadTransactions } = useMyCardsStore()
const addNewCardDialogIsOpened = ref(false);
const myCards = computed(() => $state.cards);
const selectedCard = computed(() => $state.selectedCard)

watch(() => selectedCard.value, (value) => {
  if (value) {
    loadTransactions(value.id)
  }
})
loadCards()
</script>

<style lang="scss">
</style>
