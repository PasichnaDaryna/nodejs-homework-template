const { HttpCode } = require('../../../helpers/constants')
module.exports.validateUploadAvatar = (req, res, next) => {
    if (!req.file) {
        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            data: 'Bad request',
            message: 'Field of avatar with file not found',
        })
    }
    next()
}
