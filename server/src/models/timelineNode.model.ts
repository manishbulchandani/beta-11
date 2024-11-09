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
    title: string;
    messege: string;
    resources: IResource[];
    userId: mongoose.Types.ObjectId;
    topic: string;
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
        title: {
            type: String,
            required: true
        },
        messege: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        resources: [ResourceSchema],
        topic: String
    },
    { timestamps: true }
);

const TimelineNode: Model<ITimelineNode> = mongoose.model<ITimelineNode>("TimelineNode", TimelineNodeSchema);
export default TimelineNode;