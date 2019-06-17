import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EntidadesListagem from './views/entidades/Listagem.vue'
import EntidadesPerfil from './views/entidades/Perfil.vue'
import TipologiaListagem from './views/tipologias/Listagem.vue'
import TipologiaPerfil from './views/tipologias/Perfil.vue'
import LegislacaoListagem from './views/legislacao/Listagem.vue'
import LegislacaoPerfil from './views/legislacao/Perfil.vue'
import ClassesListagem from './views/classes/Listagem.vue'
import ClassesPerfil from './views/classes/Perfil.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/entidades',
      name: 'entidades',
      component: EntidadesListagem,
    },
    {
      name: 'perfilEntidade',
      path: '/entidades/:id',
      component: EntidadesPerfil,
      props: true
    },
    {
      name: 'tipologias',
      path: '/tipologias',
      component: TipologiaListagem
    },
    {
      name: 'perfilTipologia',
      path: '/tipologias/:id',
      component: TipologiaPerfil,
      props:true
    },
    {
      name: 'legislacao',
      path: '/legislacao',
      component: LegislacaoListagem
    },
    {
      name: 'perfilLegislacao',
      path: '/legislacao/:id',
      component: LegislacaoPerfil,
      props:true
    },
    {
      name: 'classes',
      path: '/classes',
      component: ClassesListagem
    },
    {
      name: 'perfilClasse',
      path: '/classes/c:id',
      component: ClassesPerfil,
      props: true
    }
  ]
})
