import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { UserChatDocument } from './models/user-chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserChatsRepository extends AbstractRepository<UserChatDocument> {
  protected readonly logger = new Logger(UserChatsRepository.name);

  constructor(
    @InjectModel(UserChatDocument.name)
    chatModel: Model<UserChatDocument>,
  ) {
    super(chatModel);
  }
}
