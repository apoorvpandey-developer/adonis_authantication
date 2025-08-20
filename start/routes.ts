// start/routes.ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
// import AuthController from '../app/controller/auth_controller.js'
const AuthController = () => import("#controllers/auth_controller")

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
  router.get('me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }))
  router.post('logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))
}).prefix('yunicorn')
