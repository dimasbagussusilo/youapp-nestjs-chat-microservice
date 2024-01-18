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
import { UserChatsService } from "./user-chats.service";
import { CreateUserChatDto } from "./dto/create-user-chat.dto";
import { UpdateUserChatDto } from "./dto/update-user-chat.dto";
import { CurrentUser, JwtAuthGuard, Roles, UserDto } from "@app/common";

@Controller("user-chats")
export class UserChatsController {
  constructor(private readonly userChatsService: UserChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createUserChatDto: CreateUserChatDto,
    // @CurrentUser() user: UserDto,
  ) {
    try {
      return await this.userChatsService.create(createUserChatDto);
    } catch (e) {
      return e;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.userChatsService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string) {
    return this.userChatsService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() updateUserChatDto: UpdateUserChatDto,
  ) {
    return this.userChatsService.update(id, updateUserChatDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  // @Roles("Admin")
  async remove(@Param("id") id: string) {
    return this.userChatsService.remove(id);
  }
}
