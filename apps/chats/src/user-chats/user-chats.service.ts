import {Injectable} from '@nestjs/common';
import {CreateUserChatDto} from './dto/create-user-chat.dto';
import {UpdateUserChatDto} from './dto/update-user-chat.dto';
import {UserChatsRepository} from './user-chats.repository';

@Injectable()
export class UserChatsService {
    constructor(
        private readonly userChatsRepository: UserChatsRepository,
    ) {
    }

    async create(
      createUserChatDto: CreateUserChatDto,
    ) {
      return this.userChatsRepository.create(createUserChatDto)
    }


    async findAll() {
        return this.userChatsRepository.find({});
    }

    async findOne(_id: string) {
        return this.userChatsRepository.findOne({_id});
    }

    async update(_id: string, updateUserChatDto: UpdateUserChatDto) {
        return this.userChatsRepository.findOneAndUpdate(
            {_id},
            {$set: updateUserChatDto},
        );
    }

    async remove(_id: string) {
        return this.userChatsRepository.findOneAndDelete({_id});
    }
}
