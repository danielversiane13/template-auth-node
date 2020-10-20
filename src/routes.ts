import { Router } from 'express'

import AuthController from './app/controllers/AuthController'
import UsersController from './app/controllers/UserController'
import auth from './app/middlewares/auth'

const routes = Router()

routes.get('/', (req, res) => res.send('api ok'))

// Routes Auth
routes.post('/login', AuthController.login)

// Routes User
routes.get('/users', auth, UsersController.index)
routes.post('/admin/users', UsersController.create)
routes.get('/users/:id', auth, UsersController.show)
routes.put('/users/:id', auth, UsersController.update)
routes.delete('/users/:id', auth, UsersController.delete)

export default routes
