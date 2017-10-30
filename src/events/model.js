const mongoose = require('mongoose');
// const userMethods = require('../controllers/userModelCtrl');
const geo = require('../geolocation').geocoder;

const CoordinationSchema = new mongoose.Schema({
	lat: {
		type: Number,
		required: true,
	},
	lon: {
		type: Number,
		required: true,
	},
});

const EventSchema = new mongoose.Schema({
	private: {
		type: Boolean,
		required: true,
		default: false
	},
	address: String,
	coordination: CoordinationSchema,
});

EventSchema.methods.setCoordinations = function() {
	if (this.address) {
		return geo.addressToCoordination(this.address)
			.then((res) => {
				this.coordination = res;
				return this;
			});
	}
}

// for(key in userMethods.methods){
// 	UserSchema.methods[key] = userMethods.methods[key]
// }

// for(key in userMethods.methods){
// 	UserSchema.statics[key] = userMethods.statics[key]
// }

mongoose.model('Event', EventSchema);