import { Router } from 'express'
import authRoutes from './auth.routes.js'
import locationRoutes from './location.routes.js'

const routes = (app, base_api) => {
    const router = Router()

    router.use('/auth', authRoutes)
    router.use('/location', locationRoutes)

    app.use(`${base_api}`, router)
}

export default routes
