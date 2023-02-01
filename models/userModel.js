const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: "https://w7.pngwing.com/pngs/532/849/png-transparent-user-person-people-profile-account-human-avatar-administrator-worker-employee.png"
    }
});

mongoose.model("userModel", userSchema);