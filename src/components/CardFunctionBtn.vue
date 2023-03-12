<template>
    <button class="card-function-btn">
        <div class="card-function-btn__icon">
            <slot name="icon"></slot>
        </div>
        <div class="card-function-btn__label">
            <slot></slot>
        </div>
    </button>
</template>

<style lang="scss">
.card-function-btn {
    @apply flex flex-col justify-start items-center;
    @apply rounded bg-transparent hover:lg:bg-white active:bg-white pt-2;
    &__icon {
    }
    &__label {
        @apply prose-2 leading-normal;
    }
}
</style>