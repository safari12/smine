/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  pass: {
    type: String,
    required: true,
    validate: {
      validator: v => {
        return v.length >= 8;
      },
      message: () => 'Password too short'
    }
  },
  admin: Boolean,
  notifications: Boolean
});

UserSchema.statics.findRecipients = async function() {
  return _.map(await this.find({ notifications: true }), 'email');
};

module.exports = mongoose.model('users', UserSchema);
