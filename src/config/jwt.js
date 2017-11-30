module.exports = {
  tokenSecret: process.env.SECRET_TOKEN_WORD || 'testSecretWord',
  tokenExpiresIn: process.env.TOKEN_EXPIRES_ID || '10h'
};
