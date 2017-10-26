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

for(key in userMethods.methods){
	UserSchema.methods[key] = userMethods.methods[key]
}

for(key in userMethods.methods){
	UserSchema.statics[key] = userMethods.statics[key]
}

mongoose.model('User', UserSchema);


