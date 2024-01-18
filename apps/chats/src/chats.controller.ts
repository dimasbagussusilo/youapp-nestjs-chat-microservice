import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { CurrentUser, JwtAuthGuard, Roles, UserDto } from "@app/common";

@Controller("chats")
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createChatDto: CreateChatDto,
  ) {
    try {
      return await this.chatsService.create(createChatDto);
    } catch (e) {
      return e;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: UserDto) {
    return this.chatsService.findAll(user._id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string) {
    return this.chatsService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  // @Roles("Admin")
  async remove(@Param("id") id: string) {
    return this.chatsService.remove(id);
  }
}
