/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var friends = require('mongoose-friends');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	student_id:{
		type: Number
	},
	gender: {
		type: String
	},
	campus: {
		type: String
	},
	invites: {
		type: Array
	},
	postDefault: {
		type: Number
	},
	visibilityList: {
		type: Array
	}
});

UserSchema.plugin(friends());
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.addFriend = function(user1id, user2id, callback){
	User.requestFriend(user1id, user2id, callback);
}

/* Not sure about this
module.exports.resetPassword = function(){

}
*/

//module.exports.getAcceptedFriends = function(callback){
	//var query = {friends: [status = 'accepted']};
	//User.find(query);
//}
