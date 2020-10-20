import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { secret } from '../config/jwt'
import { User } from '../models/User'

type TokenType = {
  user: {
    id: number
    name: string
    email: string
  }
  iat: number
  exp: number
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(403).json({ error: 'No token provided' })
  }

  const [type, token] = authorization.split(' ')

  if (!token) {
    return res.status(403).json({ error: 'No token provided' })
  }

  if (!/^Bearer$/i.test(type)) {
    return res.status(401).json({ error: 'Token malformatted' })
  }

  try {
    const { user } = verify(token, secret) as TokenType
    req.user = await User.findOneOrFail({
      where: { id: user.id, is_active: true },
      cache: true
    })
    next()
  } catch (e) {
    return res.status(403).json('Token invalid.')
  }
}
