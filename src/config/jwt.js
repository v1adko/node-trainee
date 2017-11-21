module.exports = {
  tokenSecret: process.env.SECRET_TOKEN_WORD || 'secretword',
  tokenExpiresIn: process.env.TOKEN_EXPIRES_ID || '2h'
};
