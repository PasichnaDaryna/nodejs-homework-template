const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const fs = require('fs').promises

require('dotenv').config()
const path = require('path')
const Jimp = require('jimp')
const SECRET_KEY = process.env.JWT_SECRET
const { HttpCode } = require('../helpers/constants')
const createFolderIsExist = require('../helpers/create-dir')


const reg = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await Users.findByEmail(email)
        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: 'error',
                code: HttpCode.CONFLICT,
                data: 'Conflict',
                message: 'Email is already use',
            })
        }
        const newUser = await Users.create(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            },
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await Users.findByEmail(email)
        if (!user || !user.validPassword(password)) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'UNAUTHORIZED',
                message: 'Invalid credentials',
            })
        }
        const id = user._id
        const payload = { id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
        await Users.updateToken(id, token)
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                token,
            },
        })
    } catch (e) {
        next(e)
    }
}

const logout = async (req, res, next) => {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
}

const avatars = async (req, res, next) => {
    try {
        const id = req.user.id
        const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS
        const pathFile = req.file.pathFile
        const newNameAvatar = `${Date.now()}-${req.file.originalName}`
        const img = await Jimp.read(pathFile)
        img.autocrop().cover(250, 200, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,)
            .writeAsync(pathFile)

        await createFolderIsExist(path.join(AVATARS_OF_USERS, id))
        await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar))
        const avatarUrl = path.normalize(path.join(id, newNameAvatar))
    } catch (e) {
        next(e)
    }
}

module.exports = { reg, login, logout, avatars }