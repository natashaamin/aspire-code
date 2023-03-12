<template>
  <div :class="['balance', `balance--${mode}`]">
    <div v-if="!hideLabel" :class="['balance__label', `balance--${mode}__label`]">Account balance</div>
    <div :class="['balance__currency', `balance--${mode}__currency`]">S$</div>
    <div :class="['balance__amount', `balance--${mode}__amount`]">{{ formattedBalance }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useUtils } from 'src/utils/useUtils'
import { computed, PropType } from 'vue'

const props = defineProps({
  balance: {
    type: Number,
    default: 0,
  },
  mode: {
    type: String as PropType<'mobile' | 'desktop'>,
    default: 'mobile',
  },
  hideLabel: {
    type: Boolean,
    default: false,
  },
})

const { formatMoney } = useUtils()

const formattedBalance = computed(() => formatMoney(props.balance))
</script>

<style lang="scss">
.balance {
  @apply text-white font-bold flex flex-wrap items-center;
  &__label {
    @apply w-full prose-11 font-semibold mb-4;
  }
  &__currency {
    @apply bg-brand rounded px-14px py-3px prose-15 mr-2.5;
  }
  &__amount {
    @apply prose-16;
  }

  &--desktop {
    @apply text-black;
    &__label {
      @apply font-normal;
    }
    &__currency {
      @apply px-13px pt-0.5 pb-1 text-white prose-3 leading-[1rem];
    }
    &__amount {
      @apply prose-26;
    }
  }
}
</style>
