import connectDB from "../DB/connection.js"
import cors from 'cors'
import authRouter from './modules/auth/auth.router.js'
import tripsRouter from './modules/trip/trip.router.js'
import categoriesRouter from './modules/category/category.router.js'
const initApp = async (app, express) => {
    app.use(express.json())
    app.use(cors())
    await connectDB();
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome...' })
    })
    app.use('/auth', authRouter)
    app.use('/trips', tripsRouter)
    app.use('/categories', categoriesRouter)
}
export default initApp