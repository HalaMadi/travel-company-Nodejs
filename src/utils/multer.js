import multer from "multer";

export const fileValidation = {
    Image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml', 'image/tiff', 'image/x-icon'],
    PDF: ['application/pdf'],
    Excel: [
        'application/vnd.ms-excel',                         // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
    ]
}

function fileUpload(customValidation = []) {
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb('invalid', false)
        }
    }
    const upload = multer({ fileFilter, storage })
    return upload
}
export default fileUpload