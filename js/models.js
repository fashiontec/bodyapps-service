var Schema = require('mongoose').Schema;
var uuid = require('node-uuid');

var userSchema = new Schema({
	name: String
	,dob: { type: Date}
	,age: Number
	,emailId: String
});

var measurementSchema = new Schema({
	m_id: { type: String, default: function() { return uuid(); } }  // measurement id is generated by UUID on creation of a measurement record.
	,m_unit: String
	,m_timestamp: { type: Date, default: Date.now() }
	,mid_neck_girth : Number
	,bust__girth : Number
	,waist_girth : Number
	,hip_girth : Number
	,across_back_shoulder_width : Number
	,shoulder_drop : Number
	,shoulder_slope_degrees :Number
	,arm_length : Number
	,wrist_girth : Number
	,upper_arm_girth : Number
	,armscye_girth : Number
	,height : Number
	,hip_height :Number
	,person : {
		name: String
		,emailId:String
		,dob: { type: Date}
	}
	,user_id : {type: String} //Schema.Types.ObjectId
});

exports.userModel = db.model('userModel', userSchema);
exports.measurementModel = db.model('measurementModel', measurementSchema);
