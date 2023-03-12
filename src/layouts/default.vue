<template>
  <q-layout view="hHh lpR fFf" class="app-layout">
    <q-drawer
      v-if="!$q.screen.lt.md"
      :model-value="true"
      class="app-layout__drawer"
      :width="340"
      behavior="desktop"
    >
      <div class="app-layout__drawer__content">
        <div class="app-layout__drawer__content__header">
          <logo-with-text />
          <div
            class="app-layout__drawer__content__header__introduce"
          >Trusted way of banking for 3,000+ SMEs and startups in Singapore</div>
        </div>

        <q-list class="app-layout__drawer__content__header__menu">
          <side-nav-bar-btn to="/home" exact>
            <template #icon>
              <logo />
            </template>
            Home
          </side-nav-bar-btn>
          <side-nav-bar-btn to="/cards" exact>
            <template #icon>
              <view-card-icon />
            </template>
            Cards
          </side-nav-bar-btn>
          <side-nav-bar-btn to="/payments" exact>
            <template #icon>
              <payments-icon />
            </template>
            Payments
          </side-nav-bar-btn>
          <side-nav-bar-btn to="/credit" exact>
            <template #icon>
              <credit-icon />
            </template>
            Credit
          </side-nav-bar-btn>
          <side-nav-bar-btn to="/profile" exact>
            <template #icon>
              <profile-icon />
            </template>
            Profile
          </side-nav-bar-btn>
        </q-list>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <q-footer v-if="$q.screen.lt.md" class="app-layout__footer">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        active-bg-color="white"
        class="app-layout__footer__tabs"
      >
        <bottom-nav-btn exact to="/home">
          <template #icon>
            <logo />
          </template>
          Home
        </bottom-nav-btn>
        <bottom-nav-btn exact to="/">
          <template #icon>
            <view-card-icon />
          </template>
          Cards
        </bottom-nav-btn>
        <bottom-nav-btn exact to="/payments">
          <template #icon>
            <payments-icon />
          </template>
          Payments
        </bottom-nav-btn>
        <bottom-nav-btn exact to="/credit">
          <template #icon>
            <credit-icon />
          </template>
          Credit
        </bottom-nav-btn>
        <bottom-nav-btn exact to="/profile">
          <template #icon>
            <profile-icon />
          </template>
          Profile
        </bottom-nav-btn>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import Logo from '@/assets/svg/logo.svg?component'
import LogoWithText from '@/assets/svg/logo-with-text-green.svg?component'
import ViewCardIcon from '@/assets/svg/view-card.svg?component'
import PaymentsIcon from '@/assets/svg/payments.svg?component'
import CreditIcon from '@/assets/svg/credit.svg?component'
import ProfileIcon from '@/assets/svg/account.svg?component'
import BottomNavBtn from '../components/BottomNavBar.vue'
import SideNavBarBtn from 'src/components/SideNavBar.vue'
</script>

<style lang="scss">
.app-layout {
  .q-drawer {
    position: fixed
  }
  &__drawer {
    background-color: #0c365A !important;

    &__content {
      position: sticky top-0 p-12;
      top: 0px;
      padding: 12px;

      &__header {
        &__introduce {
          color: white ;
          opacity: 30px;
          margin-top: 19px;
        }
        &__menu {
          margin-top: 18px;
          color: white;
          gap: 11;
        }
      }
    }
  }
  &__footer {
    background-color: white !important;

    filter: drop-shadow(0px 0px 3px #00000014);

    &__tabs {
      color: gray;
      padding-top: 1px;
      padding-bottom: 2px;
    }
  }
}
</style>
