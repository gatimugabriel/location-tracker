export default (mongoose) => {
    const TokenSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            enum: ['auth', 'password-reset'],
            default: 'auth',
        },
        expires: {
            type: Date,
            required: true,
        },
    }, {
        timestamps: true,
    });

    return mongoose.model('Token', TokenSchema);
};
