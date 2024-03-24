import {compare, genSalt, hash} from 'bcrypt';

export default (mongoose) => {
    const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        locationHistory: {
            type: Array,
            default: [],
        }
    }, {
        timestamps: true
    })

    // -- hash password before saving user
    UserSchema.pre('save', async function (next) {
        if (this.password) {
            const salt = await genSalt(10);
            this.password = await hash(this.password, salt);
        }
    })
    // --  matchPassword prototype method
    UserSchema.methods.matchPassword = async function (enteredPassword) {
        return await compare(enteredPassword, this.password);
    }

    return mongoose.model('User', UserSchema);
}
