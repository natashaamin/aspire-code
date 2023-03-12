<template>
  <div class="credit-card-wrapper">
    <button
      v-if="!newCard"
      :class="[
        'credit-card-wrapper__show-card-number',
        {
          'credit-card-wrapper__show-card-number--visible': swiperSlide?.isActive && !isFrozen,
        },
      ]"
      @click="isCardnumberVisible = !isCardnumberVisible"
    >
      <EyeIcon v-if="!isCardnumberVisible" class="credit-card-wrapper__show-card-number__eye" />
      {{ isCardnumberVisible ? 'Hide' : 'Show' }} card number
    </button>
    <div ref="cardRef" class="credit-card-wrapper__card">
      <div ref="cardInfoRef" class="credit-card-wrapper__card__info">
        <div v-if="isFrozen" class="credit-card-wrapper__card__info__frozen-overlay">
          <FreezeCardIcon class="credit-card-wrapper__card__info__frozen-overlay__frozen-logo" />
        </div>
        <LogoWithText class="credit-card-wrapper__card__info__aspire-logo" />
        <div class="credit-card-wrapper__card__info__holder">{{ cardHolder }}</div>
        <div class="credit-card-wrapper__card__info__number">{{ formattedCardnumber }}</div>
        <div class="credit-card-wrapper__card__info__expiry-date-and-cvv">
          <span
            class="credit-card-wrapper__card__info__expiry-date-and-cvv__expiry-date"
          >Thru: {{ expiryDate }}</span>
          <span class="credit-card-wrapper__card__info__expiry-date-and-cvv__cvv">
            <span>CVV:</span>
            <span class="credit-card-wrapper__card__info__expiry-date-and-cvv__cvv__number">
              {{
                isCardnumberVisible || newCard ? cvv : '***'
              }}
            </span>
          </span>
        </div>
        <VisaLogo
          v-if="cardNetwork === 'visa'"
          class="credit-card-wrapper__card__info__card-network-logo"
        />
        <MastercardLogo
          v-if="cardNetwork === 'mastercard'"
          class="credit-card-wrapper__card__info__card-network-logo"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LogoWithText from '@/assets/svg/logo-with-text.svg?component'
import VisaLogo from '@/assets/svg/visa-logo.svg?component'
import MastercardLogo from '@/assets/svg/mastercard.svg?component'
import FreezeCardIcon from '@/assets/svg/freeze-card.svg?component'
import EyeIcon from '@/assets/svg/eye.svg?component'
import { computed, onBeforeUnmount, Ref, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useSwiperSlide } from 'swiper/vue'
import validateCard from 'card-validator'

const props = defineProps({
  cardHolder: {
    type: String,
    default: 'Cardholder Name',
  },
  cardnumber: {
    type: String,
    default: '#### #### #### ####',
  },
  expiryDate: {
    type: String,
    default: 'MM/YY',
  },
  cvv: {
    type: String,
    default: '###',
  },
  newCard: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'active'
  }
})

const emit = defineEmits<{
  (event: 'select'): void
}>()

const swiperSlide = props.newCard ? ref(null) : useSwiperSlide()
const cardRef = ref(null)
const cardInfoRef = ref(null) as unknown as Ref<HTMLElement>
const isCardnumberVisible = ref(false)
const formattedCardnumber = computed(() =>
  isCardnumberVisible.value || props.newCard ? props.cardnumber : props.cardnumber.replace(/[\w](?=.{4})/g, '●')
)
const isFrozen = computed(() => props.status === 'frozen')
const cardNetwork = computed(() => validateCard.number(props.cardnumber).card?.type)

const cardResizeObserver = useResizeObserver(cardRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  const height = width * 0.6145
  const cardScale = Math.min(width / 358, height / 220)
  cardInfoRef.value.style.setProperty('transform', `translate(-50%, -50%) scale(${cardScale})`)
})
watch(
  () => swiperSlide.value,
  (value) => {
    isCardnumberVisible.value = false
    if (value?.isActive) {
      emit('select')
    }
  }
)

onBeforeUnmount(() => {
  cardResizeObserver.stop()
})
</script>

<style lang="scss">
.credit-card-wrapper {
  @apply flex flex-col lg:w-full #{!important};
  &__card {
    @apply pt-[61.45%] bg-brand w-full relative rounded-xl text-white font-bold overflow-hidden;
    &__info {
      @apply w-358px h-220px absolute top-1/2 left-1/2 p-6;
      @apply flex flex-col;
      &__frozen-overlay {
        @apply absolute w-full h-full bg-black bg-opacity-30 z-2 top-0 left-0;
        &__frozen-logo {
          @apply relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150;
        }
      }
      &__aspire-logo {
        @apply self-end mb-6;
      }
      &__holder {
        @apply prose-22 mb-6;
      }
      &__number {
        @apply prose-21 mb-2.5;
        word-spacing: 0.75rem;
      }
      &__expiry-date-and-cvv {
        &__expiry-date {
          @apply prose-23 w-[fit-content];
        }

        &__cvv {
          @apply prose-20 ml-30px;
          &__number {
            @apply prose-24 ml-1;
            vertical-align: -webkit-baseline-middle;
          }
        }
      }
      &__card-network-logo {
        @apply absolute right-6 bottom-6;
      }
    }
  }
  &__show-card-number {
    @apply w-[fit-content] pt-5px px-2.5 pb-18px relative bg-white opacity-0 top-10 transition-all duration-300;
    @apply text-brand rounded-t-md self-end prose-13 font-semibold flex items-center;
    &__eye {
      @apply text-brand mr-2.5;
    }
    &--visible {
      @apply visible opacity-100 top-4 lg:top-2;
    }
  }
}
</style>
