const mongoose = require('mongoose');
const userMethods = require('../controllers/userModelCtrl');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	hash: String,
	salt: String
});

UserSchema.methods.setPassword = userMethods.setPassword;
UserSchema.methods.validPassword = userMethods.validPassword;
UserSchema.methods.generateJwt = userMethods.generateJwt;
UserSchema.methods.getSafeUser = userMethods.getSafeUser;

UserSchema.statics.verifyJwt = userMethods.verifyJwt;

mongoose.model('User', UserSchema);


