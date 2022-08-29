const crypto = require('crypto');
const key = process.env.SECRET_KEY;

function encrypt(data) {
  // Prepare encryption config
  const decodedKey = Buffer.from(key, 'base64');
  const ivBuf = crypto.randomBytes(12);
  const timeStampMillisBig = BigInt(new Date().getTime());
  const timeBuff = Buffer.alloc(8);
  timeBuff.writeBigUInt64BE(timeStampMillisBig);
  const nonce = Buffer.from(crypto.randomBytes(8));

  // Use AES 256 GCM Mode and start encryption
  const body = Buffer.concat([timeBuff, nonce, Buffer.from(JSON.stringify(data))]); // timestamp + nonce + Payload
  const cipher = crypto.createCipheriv('aes-256-gcm', decodedKey, ivBuf);
  const crypted = Buffer.concat([cipher.update(body, 'utf8'), cipher.final()]);

  // create envelope
  const envelope = Buffer.concat([Buffer.from('\x01'), ivBuf, crypted, cipher.getAuthTag()]);
  const base64Envelope = envelope.toString('base64');

  return base64Envelope;
}

function decrypt(encdata, responsekey=key) {
  // base64 decoding
  const bData = Buffer.from(encdata, 'base64');

  // convert data to buffers
  const iv = bData.slice(0, 12);
  const text = bData.slice(12, bData.length-16);
  const tag = bData.slice(bData.length-16);

  // AES 256 GCM Mode
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(responsekey, 'base64'), iv);
  decipher.setAuthTag(tag);

  // encrypt the given text
  const decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');

  return decrypted;
}

module.exports = {
  encrypt,
  decrypt,
};
