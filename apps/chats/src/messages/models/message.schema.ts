import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";
import { SchemaTypes } from "mongoose";

@Schema({ collection: "messages", versionKey: false })
export class MessageDocument extends AbstractDocument {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: "users",
  })
  sender_id: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: "chats",
  })
  chat_id: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop()
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
