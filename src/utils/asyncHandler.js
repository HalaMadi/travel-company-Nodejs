export const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            return await func(req, res, next)
        } catch (err) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: err.stack
            })
        }
    }
}