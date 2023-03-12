<template>
  <q-layout class="login-pg">
    <q-page-container :style-fn="tweak">
      <div class="login-card">
        <div class="brand-col">
          <div class="logo">
            <Logo />
          </div>
          <div class="tagline">
            Trusted way of banking for 3,000+ SMEs and startups in Singapore
          </div>
        </div>
        <div class="form-col">
          <div class="welcome-msg">Welcome to Aspire</div>
          <div class="separator"></div>
          <div class="social-tab">
            <div class="g-logo-img">
              <GoogleLogo />
            </div>
            <div class="google">Login with Google</div>
          </div>
          <div class="q-pa-lg">OR</div>
          <div class="login-form">
            <q-input class="q-mb-lg" outlined v-model.trim="email" label="Email" type="email" />
            <q-input class="q-mb-lg" outlined v-model.trim="password" label="Password" type="password" />
            <p class="text-center text-red-5" v-if="!formIsValid">
              Please enter a valid email and password.Password should be 6 character long
            </p>
            <p class="text-center text-red-5" v-if="error">{{ error }}</p>

            <div class="text-center loader-wrap">
              <q-spinner-oval v-show="isLoading" color="primary" size="2em" class="loader" />
            </div>
            <div class="login-btn">
              <q-btn v-if="mode == 'login'" @click="submitForm" color="secondary" label="Log In"
                style="width: 172px; border-radius: 8px" />
              <q-btn v-else color="secondary" @click="submitForm" label="Sign up"
                style="width: 172px; border-radius: 8px" />
            </div>
            <div v-if="mode == 'login'" class="signup-link q-mt-lg text-center">
              <span class="q-mr-xs" @click="authMode"> Not registered? Created an Account </span>
            </div>
            <div v-else class="signup-link q-mt-lg text-center">
              <span class="q-mr-xs"> Click here to </span>
              <p @click="authMode" class="q-ml-xs text-bold" style="color: #0c365a; cursor: pointer">
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import Logo from '@/assets/svg/logo-with-text-green.svg?component'
import GoogleLogo from '@/assets/svg/google-logo.svg?component'
import { Notify } from 'quasar'
import { computed, ref } from 'vue'
import { useUsers } from 'src/services/users'
import { useUserStore } from 'src/stores/store-user'
import { offset } from 'dom7'
import router from "@/router";
import { IUsers } from 'src/models/users'

const { addNewUsers } = useUsers()
const { setUser } = useUserStore()

const email = ref('')
const password = ref('')
const formIsValid = ref(true)
const mode = ref('login')
const isLoading = ref(false)
const error = ref(null)

const submitForm = async () => {
  formIsValid.value = true
  if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
    formIsValid.value = false
    return
  }

  isLoading.value = true;

  try {
    
    const result = await addNewUsers({
      email: email.value,
      password: password.value
    })

    if (result === 'This account has already been added' && mode.value === 'login') {
      Notify.create({
        message: result,
        type: 'info'
      });
      router.replace({ name: 'Card' });
    } else {
      setUser(result as IUsers[]);
      mode.value = 'signup';
      Notify.create({
        message: 'Your account has successfully added',
        type: 'positive'
      })
    };
    
    isLoading.value = false;

  } catch (err: any) {
    console.log(err.message, "error")
    error.value = err.message || "Failed to authenticate."
  }


}

const authMode = () => {
  if (mode.value === 'login') {
    mode.value = 'signup'
  } else {
    mode.value = 'login'
  }
}

const tweak = () => {
  return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
}
</script>

<style lang="scss">
.login-pg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-card {
  display: flex;
  border: 1px solid #fcfcfc;
  box-shadow: 0px 2px 12px #00000014;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  max-height: 750px;
  box-shadow: 0 0 5px #fff, 0 20px 30px 10px rgb(0 0 0 / 10%);
  border-radius: 20px;
  overflow: hidden;
}

.brand-col {
  width: 50%;
  background-color: #0c365a;
  padding: 26px;

  .tagline {
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    margin-top: 28px;
  }
}

.form-col {
  width: 50%;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 314px;

  .welcome-msg {
    font-size: 28px;
    font-weight: 600;
    color: #0c365a;
  }
}

.separator {
  border-bottom: 1px solid #e9ebed;
  margin-bottom: 20px;
  width: 90%;
}

.social-tab {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 200px;
  background: #ffffff;
  padding: 12px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  /* padding: 7px; */
  .g-logo-img {
    display: flex;
    margin-right: 20px;
  }
}

.social-tab:hover {
  background: #f5f5f5;
}

.login-form {
  width: 80%;

  .login-btn {
    display: flex;
    justify-content: center;
  }
}

.loader-wrap {
  position: relative;

  .loader {
    position: absolute;
    top: -106px;
  }
}
</style>
