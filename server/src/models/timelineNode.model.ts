import mongoose, { Document, Schema, Model } from "mongoose";

export enum topics {
    WEB = "WEB DEVELOPMENT",
    APP = "APP DEVELOPMENT",
    AIML = "AI & ML"
};

export enum contentTypes {
    URL = "URL",
    FILE = "FILE"
};

export interface IResource extends Document {
    contentType: "URL" | "FILE";
    content: string | undefined;
}

export interface ITimelineNode extends Document {
    title: string;
    messege: string;
    resources: IResource[];
    userId: mongoose.Types.ObjectId;
    topic: "WEB DEVELOPMENT" | "APP DEVELOPMENT" | "AI & ML";
}

const ResourceSchema = new Schema<IResource>(
    {
        contentType: {
            type: String,
            enum: contentTypes,
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
        topic: {
            type: String,
            enum: topics,
            required: true,
        }
    },
    { timestamps: true }
);

const TimelineNode: Model<ITimelineNode> = mongoose.model<ITimelineNode>("TimelineNode", TimelineNodeSchema);
export default TimelineNode;