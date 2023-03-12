<template>
    <q-item v-bind="$attrs" class="side-bar-nav" exact-active-class="side-bar-nav--active" clickable manual-focus>
        <div class="side-bar-nav__icon">
            <slot name="icon"></slot>
        </div>
        <div class="side-bar-nav__label">
            <slot></slot>
        </div>
    </q-item>
</template>

<style lang="scss"> 
.side-bar-nav {
  color: #fff;
  transition-property: color;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start !important;
}

.side-bar-nav:hover {
  color: #00bcd4;
}

.side-bar-nav__icon {
  margin-right: 1rem;
  display: flex;
  align-items: center;
}

.side-bar-nav__label {
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0;
  margin-bottom: 1rem;
}

.side-bar-nav--active {
  color: #00bcd4;
  font-weight: bold;
}

</style>