import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { expiresIn, secret } from '../config/jwt'

import { User } from '../models/User'

export default {
  async login(req: Request, resp: Response) {
    const { email, password } = req.body
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where: [{ email }],
      select: ['id', 'name', 'email', 'password', 'is_active']
    })

    if (!user) {
      return resp
        .status(400)
        .json({ status: false, message: 'User does not exist' })
    }

    if (!user.is_active) {
      return resp
        .status(400)
        .json({ status: false, message: 'User does not active' })
    }

    if (!(await user.checkPassword(password))) {
      return resp
        .status(400)
        .json({ status: false, message: 'Incorrect Password' })
    }

    delete user.password

    return resp.json({
      user,
      token: jwt.sign({ user }, secret, { expiresIn })
    })
  }
}
