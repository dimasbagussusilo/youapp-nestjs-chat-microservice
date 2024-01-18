import {IsNotEmpty, IsString} from "class-validator";

export class CreateChatDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    title: string;
}
