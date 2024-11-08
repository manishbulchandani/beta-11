import mongoose, { Document, Schema, Model } from "mongoose";


enum ContentType {
    URL = "URL",
    FILE = "FILE"
}

export interface IResource extends Document {
    contentType: ContentType;
    content: string;
}

export interface ITimelineNode extends Document {
    message: string;
    resources: IResource[];
    topic: string
}

const ResourceSchema = new Schema<IResource>(
    {
        contentType: {
            type: String,
            enum: Object.values(ContentType),
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const TimelineNodeSchema = new Schema<ITimelineNode>(
    {
        message: {
            type: String,
            required: true
        },
        resources: [ResourceSchema],
        topic: String
    },
    { timestamps: true }
);

const TimelineNode: Model<ITimelineNode> = mongoose.model<ITimelineNode>("TimelineNode", TimelineNodeSchema);
export default TimelineNode;