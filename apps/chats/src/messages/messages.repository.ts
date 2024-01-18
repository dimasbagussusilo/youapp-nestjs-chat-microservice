import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { MessageDocument } from './models/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessagesRepository extends AbstractRepository<MessageDocument> {
  protected readonly logger = new Logger(MessagesRepository.name);

  constructor(
    @InjectModel(MessageDocument.name)
    chatModel: Model<MessageDocument>,
  ) {
    super(chatModel);
  }
}
