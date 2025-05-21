import connectDB from "../DB/connection.js"
import cors from 'cors'
import authRouter from './modules/auth/auth.router.js'
import categoriesRouter from './modules/category/category.router.js'
import tripsRouter from './modules/trip/trip.router.js'
import bookingsRouter from './modules/booking/booking.router.js'
import couponsRouter from './modules/coupon/coupon.router.js'
import reviewsRouter from './modules/review/review.router.js'
const initApp = async (app, express) => {
    app.use(express.json())
    app.use(cors())
    await connectDB();
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome...' })
    })
    app.use('/auth', authRouter)
    app.use('/categories', categoriesRouter)
    app.use('/trips', tripsRouter)
    app.use('/coupons', couponsRouter)
    app.use('/bookings', bookingsRouter)
    app.use('/reviews', reviewsRouter)
    app.use((err, req, res, next) => {
        return res.status(404).json({ err: err.message })
    })
}
export default initApp;