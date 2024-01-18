import { Module } from "@nestjs/common";
import {
  DatabaseModule,
  LoggerModule,
  HealthModule,
  AUTH_SERVICE,
} from "@app/common";
import { UserChatDocument, UserChatSchema } from "./models/user-chat.schema";
import { ChatGateway } from "../chats.gateway";
import { UserChatsRepository } from "./user-chats.repository";
import { UserChatsService } from "./user-chats.service";
import { UserChatsController } from "./user-chats.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserChatDocument.name, schema: UserChatSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>("RABBITMQ_URI")],
            queue: "auth",
          },
        }),
        inject: [ConfigService],
      },
    ]),
    LoggerModule,
    HealthModule,
  ],
  controllers: [UserChatsController],
  providers: [UserChatsRepository, UserChatsService],
  exports: [UserChatsService],
})
export class UserChatsModule {}
