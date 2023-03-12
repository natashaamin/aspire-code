<template>
  <div class="card-list">
    <TabGroup>
      <TabList class="card-list__tabs">
        <Tab v-slot="{ selected }">
          <div
            :class="[
              'card-list__tabs__tab',
              {
                'card-list__tabs__tab--active': selected,
              },
            ]"
          >My debit cards</div>
        </Tab>
        <Tab v-slot="{ selected }" disabled>
          <div
            :class="[
              'card-list__tabs__tab',
              {
                'card-list__tabs__tab--active': selected,
              },
            ]"
          >All company cards</div>
        </Tab>
      </TabList>
      <TabPanels class="card-list__tab-panels">
        <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels } from '@headlessui/vue'
</script>

<style lang="scss">
.card-list {
  @apply text-white lg:text-black;
  &__tabs {
    @apply flex gap-33px mb-6 lg:mb-4;
    &__tab {
      @apply prose-1 opacity-50 pb-5px border-b-2 border-transparent;
      &--active {
        @apply opacity-100 font-bold border-cyan;
      }
    }
  }
  &__tab-panels {
    @apply -mx-24px lg:mx-0;
  }
}
</style>
