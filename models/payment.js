const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema(
    {
       event_name:{
            type: String,
            required: true,
            enum: ['payment.authorized', 'payment.captured', 'payment.failed']
       },
            payment_status: {
                type: String,
                enum: ['authorized', 'captured', 'failed', 'pending'],
                default: 'pending'
            },
            payment_amount: {
                type: Number,
                required: true
            },
            payment_id:{
                type: String,
                unique: false,
                required: true
            },
            payment_currency: {
                type: String,
                required: true  
            },
        
        event_created_at: {
            type: String,
            required: true
        },
        event_id: {
            type: String,
            required: true,
            unique: true
        },
        payload_raw:{
            type:Object,
            required: true
        }
    },
    { timestamps: true }
    
)

module.exports = mongoose.model('Payment', paymentSchema);