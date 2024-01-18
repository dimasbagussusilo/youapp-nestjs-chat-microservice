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
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { CurrentUser, JwtAuthGuard, Roles, UserDto } from "@app/common";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    // @CurrentUser() user: UserDto,
  ) {
    try {
      return await this.messagesService.create(createMessageDto);
    } catch (e) {
      return e;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("Admin")
  async remove(@Param("id") id: string) {
    return this.messagesService.remove(id);
  }
}
