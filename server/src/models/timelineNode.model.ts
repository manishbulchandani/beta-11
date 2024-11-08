import mongoose, { Document, Schema, Model } from "mongoose";

enum ContentType {
    URL = "URL",
    FILE = "FILE"
}

export interface IResoure extends Document {
    contentType: ContentType;
    content: string;
}

export interface ITimelineNode extends Document {
    messege: string;
    resources: IResoure[];
    topic: string
}

const ResoureSchema = new Schema<IResoure>(
    {
        contentType: ContentType,
        content: {
            type: String,
            required: true
        }
    },{ timestamps: true }
);

const TimelineNodeSchema = new Schema<ITimelineNode>(
    {
        messege: {
            type: String,
            required: true
        },
        resources: [ResoureSchema],
        topic: String
    },
    { timestamps: true }
);

const TimelineNode: Model<ITimelineNode> = mongoose.model<ITimelineNode>("TimelineNode", TimelineNodeSchema);
export default TimelineNode;