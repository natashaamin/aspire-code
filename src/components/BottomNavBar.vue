<template>
    <q-route-tab
        exact
        v-bind="$attrs"
        class="bottom-nav-btn__tab"
        exact-active-class="bottom-nav-btn__tab--active"
        content-class="bottom-nav-btn__tab__content"
        :ripple="false"
    >
        <div class="flex-grow"></div>
        <slot name="icon"></slot>
        <div class="flex-grow"></div>
        <span class="bottom-nav-btn__tab__content__label">
            <slot></slot>
        </span>
    </q-route-tab>
</template>

<style lang="scss">
.bottom-nav-btn {
    @apply active:bg-white;
    &__tab {
        @apply prose-4 text-grey #{!important}
        &__content {
            @apply flex flex-col py-0 #{!important}
        }
        &--active {
            @apply font-bold;
        }
    }
}
</style>