import {IsMongoId, IsNotEmpty, IsString} from "class-validator";

export class CreateUserChatDto {
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @IsNotEmpty()
  @IsMongoId()
  chat_id: string;
}
