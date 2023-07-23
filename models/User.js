const { Schema, model, models } = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
});

// hashes the password before it's stored in mongo
UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

module.exports = models.User || model('User', UserSchema);

