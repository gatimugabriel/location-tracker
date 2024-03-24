export default (mongoose) => {
    const LocationSchema = new mongoose.Schema({
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    }, {
        timestamps: true,
    });

    return mongoose.model('Location', LocationSchema);
};
