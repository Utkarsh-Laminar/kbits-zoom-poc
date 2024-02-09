require('dotenv').config({
  path: '../.env',
})
import jwt from 'jsonwebtoken'

export function getApiKey() {
  return process.env.ZOOM_API_KEY

}

export function getToken(meetingNumber) {
  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const apiKey = process.env.ZOOM_API_KEY
  const apiSecret = process.env.ZOOM_API_SECRET
  const role = 0

  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    appKey: apiKey,
    sdkKey: apiKey,
    mn: meetingNumber,
    role,
    iat,
    exp,
    tokenExp: exp,
  }
  const token = jwt.sign(payload, apiSecret, { algorithm: 'HS256', header })
  return token
}