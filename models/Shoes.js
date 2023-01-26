const { Schema, model, Types } = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const shoesSchema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true, min: [0, 'The Price cannot be negative number!'] },
    size: { type: Number, required: true, min: [30, 'The size must be 30 or greater!'] },
    description: { type: String },
    img: {
        type: String,
        validate: {
            validator: function (val) {
                let pattern = new RegExp('\/.');
                return pattern.test(val);
            },
            message: (props) => `${props.value} is invalid image URL!`
        },
        default: '/static/default.png'
    },
    extras: { type: [Types.ObjectId], default: [], ref: 'extra' },
    ownerId: { type: Types.ObjectId, required: true, ref: 'user' }
},
    { timestamps: true })

shoesSchema.virtual('totalValue').get(function () {
    return this.price + this.extras.reduce((acc, c) => acc + Number(c.price), 0)
})
shoesSchema.plugin(mongooseLeanVirtuals);
const Shoes = model('shoes', shoesSchema);

module.exports = Shoes;