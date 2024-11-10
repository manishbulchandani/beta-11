import mongoose, { Document, Schema, Model } from "mongoose";

export interface IReply extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    content: string;
}

export interface IDoubt extends Document {
    userId: mongoose.Types.ObjectId;
    content: string;
    tags: string[];
    fileUrl: string;
    threads: [IReply];
}

const ReplySchema = new Schema<IReply>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{timestamps: true}
);

const DoubtSchema = new Schema<IDoubt>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [String],
    fileUrl: String,
    threads: [ReplySchema]
});

const Doubt: Model<IDoubt> = mongoose.model<IDoubt>("Doubt", DoubtSchema);
export default Doubt;
