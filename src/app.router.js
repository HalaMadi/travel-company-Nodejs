import connectDB from "../DB/connection.js"
import cors from 'cors'
import authRouter from './modules/auth/auth.router.js'
const initApp = async (app, express) => {
    app.use(express.json())
    app.use(cors())
    await connectDB();
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome...' })
    })
    app.use('/auth', authRouter)
}
export default initApp