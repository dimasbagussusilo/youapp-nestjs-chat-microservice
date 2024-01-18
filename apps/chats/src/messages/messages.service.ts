import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async create(createMessageDto: CreateMessageDto) {
    return this.messagesRepository.create({...createMessageDto, timestamp: new Date() });
  }

  async findAll() {
    return this.messagesRepository.find({});
  }

  async findOne(_id: string) {
    return this.messagesRepository.findOne({ _id });
  }

  async update(_id: string, updateMessageDto: UpdateMessageDto) {
    return this.messagesRepository.findOneAndUpdate(
      { _id },
      { $set: updateMessageDto },
    );
  }

  async remove(_id: string) {
    return this.messagesRepository.findOneAndDelete({ _id });
  }
}
