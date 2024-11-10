import mongoose, { Document, Schema, Model } from "mongoose";

export interface IKeyword extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    keywords: string[];
}

const KeywordSchema = new Schema<IKeyword>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        keywords: [String]
    }
);

const Keyword: Model<IKeyword> = mongoose.model<IKeyword>("Keyword", KeywordSchema);
export default Keyword;  