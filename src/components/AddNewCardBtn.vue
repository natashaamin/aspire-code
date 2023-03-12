<template>
  <button class="add-new-card-btn lg:px-3 lg:py-2 lg:bg-dark-blue-1 lg:rounded lg:text-white">
    <PlusCircle />
    <span>{{title}}</span>
  </button>
</template>

<script lang="ts" setup>
import PlusCircle from '@/assets/svg/plus-circle.svg?component';

defineProps({
  title: {
    type: String,
    default: 'New Loan'
  }
})
</script>

<style lang="scss">
.add-new-card-btn {
  // font-weight: bold;
  color: white;
  background-color: #325BAF;
  font-size: 13pt;
  display: flex;
  align-items: center;
  white-space: nowrap;
}


.add-new-card-btn__icon {
  margin-right: 0.375rem;
}

</style>
