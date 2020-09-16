<template>
  <div>
    <h2 class="col-xl-8 col-11 intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left  ">
        Sign In
    </h2>
    <div>A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place</div>
    <div>
        <q-input v-model="email" label="Email"/>
        <q-input type="password" class="intro-x login__input input input--lg border border-gray-300 block mt-4" placeholder="Password" v-model="password"/>
    </div>
    <div class="intro-x flex text-gray-700 text-xs sm:text-sm mt-4">
        <div class="flex items-center mr-auto">
            <q-checkbox type="checkbox" v-model="rememberme" label="Remember me"/>
        </div>
        <a href="">Forgot Password?</a>
    </div>
    <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left" >
        <q-btn class="button button--lg w-full xl:w-32 text-white bg-theme-1 xl:mr-3" to="/">Login</q-btn>
        <q-btn class="button button--lg w-full xl:w-32 text-gray-700" to="/register">Registre-se</q-btn>
    </div>
    <div class="intro-x mt-10 xl:mt-24 text-gray-700 text-center xl:text-left">
        By signin up, you agree to our
        <br>
        <a class="text-theme-1" href="">Terms and Conditions</a> & <a class="text-theme-1" href="">Privacy Policy</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      rememberme: false
    }
  },
  components: {
  }
}
</script>
