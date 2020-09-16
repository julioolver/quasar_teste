<template>
  <login-laoyut>
    <span slot="login">
      <q-btn
          flat
          dense
          round
          icon="home"
          aria-label="home"
          to="/"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Criar Conta
      </h2>
      <div>A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place</div>
    <div class="">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <q-input
        filled
        v-model="user.name"
        label="Digite seu Nome *"
        hint="Nome e Sobrenome"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor, informe seu nome']"
      />

      <q-input
        filled
        type="email"
        v-model="user.email"
        label="Informe seu E-mail"
        hint="E-mail Válido"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor, informe seu E-mail']"
      />
      <q-input
      filled
      v-model="user.password"
      type="password"
      label="Digite sua Senha"
      hint="Informe uma Senha Válida"
      />
      <q-input
      filled
      v-model="user.password_confirmation"
      type="password"
      label="Confirme a Senha"
      hint="Confirme a Senha digitada Anteriormente"
      lazy-rules
      :rules="[ val => val == user.password || 'As senhas não coincidem!']"
      />
      <div>
        <q-btn label="Criar" type="submit" color="primary"/>
        <q-btn label="LimparCampos" type="reset" color="red" flat class="q-ml-sm"/>
      </div>
      </q-form>
    </div>
    </span>
  </login-laoyut>
</template>
<script>
import LoginLaoyut from 'layouts/LoginLayout.vue'

export default {
  data () {
    return {
      user: {
        name: null,
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  components: {
    LoginLaoyut
  },
  methods: {
    onSubmit () {
      this.$q.loading.show()
      this.$axios
        .post('http://127.0.0.1:8000/api/usuario/store', this.user)
        .then(response => {
          this.$q.loading.hide()
          console.log(response)
          if (response.data.token) {
            // Login efetuado com sucesso
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Conta Criada com Sucesso'
            })
            sessionStorage.setItem('user', JSON.stringify(response.data))
            this.$router.push('/')
          } else if (response.data.status === false) {
          // Login não existe
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Erro no cadastro'
            })
          } else {
            // erros de validação
            let erros = ''
            for (const erro of Object.values(response.data)) {
              erros += erro + ' '
            }
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: erros
            })
          }
        })
        .catch(e => {
          this.$q.loading.hide()
          // this.errors.push(e)
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Erro ao Conectar com o servidor'
          })
        })
    },
    onReset () {
      this.user.name = null
      this.user.email = ''
    }
  }
}
</script>
