
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login-novo', component: () => import('pages/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/teste',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/register',
    component: () => import('pages/Login/registrer.vue')
  },
  {
    path: '/perfil',
    component: () => import('pages/perfil/Perfil.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
