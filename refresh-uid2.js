const axios = require('axios');
const { decrypt } = require('./encrypt');

const resfreshResponseKey = process.argv.slice(2)[0]
const refreshToken = process.argv.slice(2)[1]

const refreshUid2Token = async (refreshResponseKey, refreshToken) => {
  try {
    console.time('Totally time taken:')
    const { data } = await axios.post('https://integ.uidapi.com/v2/token/refresh', refreshToken, {
      headers: {
        authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        'Content-Type': 'text/plain',
      },
    });

    console.log('***Token refreshed, Info Below***')
    console.log(JSON.parse(decrypt(data, refreshResponseKey)));
    console.log('*******************************')
    console.timeEnd('Totally time taken:')
  } catch (error) {
    console.log(error);
  }
};

refreshUid2Token(resfreshResponseKey, refreshToken)