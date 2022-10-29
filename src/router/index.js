import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import QuizView from '../views/QuizView.vue'
import DeveloperView from '../views/DeveloperView.vue'
import RankingsView from '../views/RankingsView.vue'
import RegisterUser from '../views/RegisterUser.vue'
import SignInUser from '../views/SignInUser.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser,
    meta: {
      ifAuth: true,
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInUser,
    meta: {
      ifAuth: true,
    }
  },
  {
    path: '/rankings',
    name: 'rankings',
    component: RankingsView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/developer',
    name: 'developer',
    component: DeveloperView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
      const removeLister = onAuthStateChanged(
        getAuth(),
        (user)=>{
          removeLister();
          resolve(user);
        },
        reject
      )
    })
};
 
router.beforeEach(async (to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)){
      if(await getCurrentUser()){
        next()
      }else{
        alert("You need to sign in first!");
        next("/signin");
      }

    }else{
      next();
    }
});

router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.ifAuth)){
    if(await getCurrentUser()){
      //next()
     if(to.name == "signin" || to.name == "register"){
          next("/");
        }
    }else{
      next()
    }

  }else{
    next();
  }
});
export default router
