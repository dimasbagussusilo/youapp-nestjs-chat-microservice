import { Module } from "@nestjs/common";
import * as Joi from "joi";
import { ChatsService } from "./chats.service";
import { ChatsController } from "./chats.controller";
import {
  DatabaseModule,
  LoggerModule,
  AUTH_SERVICE,
  PAYMENTS_SERVICE,
  HealthModule,
} from "@app/common";
import { ChatsRepository } from "./chats.repository";
import { ChatDocument, ChatSchema } from "./models/chat.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ChatGateway } from "./chats.gateway";
import { UserChatsController } from "./user-chats/user-chats.controller";
import { MessagesController } from "./messages/messages.controller";
import { UserChatsModule } from "./user-chats/user-chats.module";
import { MessagesModule } from "./messages/messages.module";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ChatDocument.name, schema: ChatSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        PAYMENTS_PORT: Joi.number().required(),
      }),
    }),
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
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>("RABBITMQ_URI")],
            queue: "payments",
          },
        }),
        inject: [ConfigService],
      },
    ]),
    HealthModule,
    UserChatsModule,
    MessagesModule,

  ],
  controllers: [ChatsController, UserChatsController, MessagesController],
  providers: [ChatsRepository, ChatsService, ChatGateway],
})
export class ChatsModule {}
