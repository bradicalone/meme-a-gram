const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('file:', file)
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + file.originalname)
    }
})

exports.upload = multer({ storage: storage })

