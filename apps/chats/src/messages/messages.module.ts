import { Module } from "@nestjs/common";
import {
  DatabaseModule,
  LoggerModule,
  HealthModule,
  AUTH_SERVICE,
} from "@app/common";
import { MessageDocument, MessageSchema } from "./models/message.schema";
import { ChatGateway } from "../chats.gateway";
import { MessagesRepository } from "./messages.repository";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: MessageDocument.name, schema: MessageSchema },
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
  controllers: [MessagesController],
  providers: [MessagesRepository, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
