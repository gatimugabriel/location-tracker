import { Router } from 'express'
import authRoutes from './auth.routes.js'

const routes = (app, base_api) => {
    const router = Router()

    router.use('/auth', authRoutes)


    app.use(`${base_api}`, router)
}

export default routes
