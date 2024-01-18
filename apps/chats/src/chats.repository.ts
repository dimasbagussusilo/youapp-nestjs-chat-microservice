import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { ChatDocument } from './models/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatsRepository extends AbstractRepository<ChatDocument> {
  protected readonly logger = new Logger(ChatsRepository.name);

  constructor(
    @InjectModel(ChatDocument.name)
    chatModel: Model<ChatDocument>,
  ) {
    super(chatModel);
  }
}
