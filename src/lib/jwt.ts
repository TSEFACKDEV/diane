import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!
const EXPIRES = process.env.JWT_EXPIRES_IN ?? '7d'

export interface JwtPayload {
  userId: string
  email: string
  role: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES } as jwt.SignOptions)
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as JwtPayload
  } catch {
    return null
  }
}