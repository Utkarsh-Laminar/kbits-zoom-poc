import jwt from 'jsonwebtoken'

export function getApiKey() {
  console.log(`JWT: ${process.env.ZOOM_API_KEY}`);
  return process.env.ZOOM_API_KEY

}

export function getToken(meetingNumber) {
  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 4
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

// import { jws } from 'jsrsasign'

// export function generateSignature(key, secret, meetingNumber, role) {

//   const iat = Math.round(new Date().getTime() / 1000) - 30
//   const exp = iat + 60 * 60 * 2
//   const oHeader = { alg: 'HS256', typ: 'JWT' }

//   const oPayload = {
//     sdkKey: key,
//     appKey: key,
//     mn: meetingNumber,
//     role: role,
//     iat: iat,
//     exp: exp,
//     tokenExp: exp
//   }

//   const sHeader = JSON.stringify(oHeader)
//   const sPayload = JSON.stringify(oPayload)
//   const sdkJWT = jws.JWS.sign('HS256', sHeader, sPayload, secret)
//   return sdkJWT
// }

// console.log(generateSignature(process.env.ZOOM_API_KEY, process.env.ZOOM_API_SECRET, 2628145555, 0))