const axios = require('axios');
const { encrypt, decrypt } = require('./encrypt');

const email = {
  email: 'TEST@email.com',
};

const generateUid2Token = async () => {
  try {
    const encryptedData = encrypt(email);

    console.time('Totally time taken:')
    const { data } = await axios.post(
      'https://integ.uidapi.com/v2/token/generate',
      encryptedData,
      {
        headers: {
          authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          'Content-Type': 'text/plain',
        },
      },
    );

    const decrpyt = decrypt(data);

    console.log('***Token Generated, Info Below***')
    console.log(JSON.parse(`{"body${decrpyt.split('body')[1]}`));
    console.log('*******************************')
    console.timeEnd('Totally time taken:')
  } catch (error) {
    console.log('***Some Error***')
    console.log(error);
  }
};

generateUid2Token();
