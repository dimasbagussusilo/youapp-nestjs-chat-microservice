import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {AbstractDocument} from '@app/common';

@Schema({collection: 'chats', versionKey: false})
export class ChatDocument extends AbstractDocument {
    @Prop({required: true, enum: ['individual', 'group']})
    type: string

    @Prop({required: true})
    title: string
}

export const ChatSchema =
    SchemaFactory.createForClass(ChatDocument);
