// app/controllers/auth_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create({
      name: payload.name,
      phoneNo: payload.phoneNo,
      email: payload.email,
      password: payload.password,
    })

    return response.created({
      message: 'User registered successfully',
      data: {
        id: user.id,
        name: user.name,
        phoneNo: user.phoneNo,
        email: user.email,
        password: user.password
      },
    })
  }


  async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await auth.use('api').createToken(user)

    return response.ok(token)
  }

  // Get Request for protected...

  async me({ auth, response }: HttpContext) {
    await auth.authenticate()
    return response.ok({
      id: auth.user!.id,
      name: auth.user!.name,
      phoneNo: auth.user!.phoneNo,
      email: auth.user!.email,
    })
  }


  //POST request  For protected routes

  async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    return response.ok({ message: 'Logged out' })
  }
}
