import {IsMongoId, IsNotEmpty, IsString} from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  sender_id: string;

  @IsNotEmpty()
  @IsMongoId()
  chat_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;

}
