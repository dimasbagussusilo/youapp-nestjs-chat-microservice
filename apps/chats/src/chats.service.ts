import {Injectable} from "@nestjs/common";
import {CreateChatDto} from "./dto/create-chat.dto";
import {UpdateChatDto} from "./dto/update-chat.dto";
import {ChatsRepository} from "./chats.repository";
import {Types} from "mongoose";


@Injectable()
export class ChatsService {
    constructor(private readonly chatsRepository: ChatsRepository) {
    }

    async create(createChatDto: CreateChatDto) {
        return this.chatsRepository.create(createChatDto);
    }

    async findAll(userId: string) {
        console.log("USERID", userId)

        return this.chatsRepository.aggregate([
            {
                $lookup: {
                    from: "user_chats",
                    localField: "_id",
                    foreignField: "chat_id",
                    as: "user_chats"
                }
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "_id",
                    foreignField: "chat_id",
                    as: "messages"
                }
            },
            {
                $match: {
                    "user_chats.user_id": new Types.ObjectId(userId)
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1
                }
            }
        ])
    }

    async findOne(_id: string) {
        const chats = await this.chatsRepository.aggregate([
            {
                $lookup: {
                    from: "user_chats",
                    localField: "_id",
                    foreignField: "chat_id",
                    as: "user_chats"
                }
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "_id",
                    foreignField: "chat_id",
                    as: "messages"
                }
            },
            {
                $match: {
                    $and: [
                        {_id: new Types.ObjectId(_id)},
                        // TODO add user filter
                        // {"user_chats.user_id": new Types.ObjectId(userId)}
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    user_chats: {
                        $map: {
                            input: "$user_chats",
                            as: "uc",
                            in: {
                                _id: "$$uc._id",
                                user_id: "$$uc.user_id",
                            }
                        }
                    },
                    messages: 1
                }
            }
        ]);

        return chats[0]
    }

    async update(_id: string, updateChatDto: UpdateChatDto) {
        return this.chatsRepository.findOneAndUpdate(
            {_id},
            {$set: updateChatDto},
        );
    }

    async remove(_id: string) {
        return this.chatsRepository.findOneAndDelete({_id});
    }
}
