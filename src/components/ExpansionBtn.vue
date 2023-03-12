<template>
    <disclosure-button class="expansion-panel" v-slot="{ open }">
        <div class="expansion-panel__icon">
            <slot name="icon"></slot>
        </div>
        <div class="expansion-panel__title">
            <slot></slot>
        </div>
        <div class="flex-grow"></div>
        <chevron-down-icon
            :class="['expansion-panel__chevron-icon', {
                'expansion-panel__chevron-icon--active': open
            }]"
        />
    </disclosure-button>
</template>

<script lang="ts" setup>
import { DisclosureButton } from '@headlessui/vue'
import ChevronDownIcon from '@/assets/svg/chevron-down.svg?component'
</script>

<style lang="scss">
.expansion-panel {
    @apply flex items-center p-6 bg-light-blue-1 rounded-lg border border-grey-1;
    @apply prose-9 font-semibold w-full h-[fit-content] mb-0;
    @apply disabled:opacity-100 #{!important};
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.05));
    &__icon {
        @apply flex items-center mr-3;
    }
    &__title {
    }
    &__chevron-icon {
        @apply transition transition-all duration-300;
        &--active {
            @apply transform rotate-180;
        }
    }
}
</style>
