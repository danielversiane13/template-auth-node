import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../models/User'

export default {
  async index(req: Request, resp: Response) {
    const userRepository = getRepository(User)

    const users = await userRepository.find({ order: { name: 'ASC' } })

    return resp.json({ users })
  },

  async create(req: Request, resp: Response) {
    const { name, email, password } = req.body

    const userRepository = getRepository(User)

    const user = userRepository.create({ name, email })
    await user.passwordHash(password)

    await userRepository.save(user)

    return resp.status(201).json({ user })
  },

  async show(req: Request, resp: Response) {
    const { id } = req.params

    const userRepository = getRepository(User)

    const user = await userRepository.findOneOrFail(id)

    return resp.json(user)
  },

  async update(request: Request, resp: Response) {
    const { id } = request.params
    const { name, email, password } = request.body

    const userRepository = getRepository(User)
    const user = await userRepository.findOneOrFail(id)
    await user.passwordHash(password)
    const updated = await userRepository.update(
      { id },
      { ...user, name, email }
    )

    if (updated.affected) {
      return resp
        .status(201)
        .json({ status: true, message: 'update: success !' })
    } else {
      return resp.status(400).json({ status: false, message: 'update: fail !' })
    }
  },

  async delete(req: Request, resp: Response) {
    const { id } = req.params
    const userRepository = getRepository(User)

    const user = await userRepository.findOneOrFail(id)

    const deleted = await userRepository.delete(user)

    if (deleted.affected) {
      return resp
        .status(201)
        .json({ status: true, message: 'delete: success !' })
    } else {
      return resp.status(400).json({
        status: false,
        message: 'already deleted or not found !'
      })
    }
  }
}
