import mongoose, { Document, Model, Schema } from "mongoose";

export interface Order extends Document {
    items: {
        food: {
            type: Schema.Types.ObjectId,
            ref: 'food'
        },
        
    }
}

const orderSchema: Schema<Order> = new mongoose.Schema(
  {

  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

orderSchema.pre("save", async function(next){
  
})

const orderModel: Model<Order> = mongoose.model("Order", orderSchema);

export default orderModel;
