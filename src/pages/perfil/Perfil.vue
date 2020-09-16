<template>
  <main-layout style="background: white; width: 80%; margin-left: 10%" class="">
    <span slot="conteudo">
      <div>A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place</div>
       <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Atualizar Dados do Perfil
      </h2>
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
        <q-btn label="Limpar Campos" color="red" type="reset" flat class="q-ml-sm"/>
      </div>
      </q-form>
    </div>
    </span>
  </main-layout>
</template>
<script>
import MainLayout from 'layouts/MainLayout.vue'
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios

export default {
  name: 'Perfil',
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  components: {
    MainLayout
  },
  methods: {
    onSubmit () {
      axios
        .post('http://127.0.0.1:8000/api/usuario/store', this.user)
        .then(response => {
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
          // this.errors.push(e)
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Erro no cadastro'
          })
        })
    },
    onReset () {
      this.name = ''
      this.email = ''
    }
  },
  created () {
    const userAux = sessionStorage.getItem('user')
    if (userAux) {
      this.user = JSON.parse(userAux)
      this.name = this.user.name
      this.email = this.user.email
    } else {
      this.$router.push('/teste')
    }
  }
}
</script>
