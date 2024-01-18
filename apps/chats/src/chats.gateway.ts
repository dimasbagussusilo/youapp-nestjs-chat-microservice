import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server } from "socket.io";
import { Socket } from "socket.io-client";
import { ChatsService } from "./chats.service";
import {isMongoId} from "class-validator";

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatsService: ChatsService) {}
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    console.log("[SERVER] Initialized");
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;
    console.log(`[SERVER] Client id: ${client.id} connected`);
    console.log(`[SERVER] Number of connected clients: ${sockets.size}`);

    const connectedClients = Array.from(sockets).map(([_, socket]) => ({
      user_id: socket.id,
    }));

    client.emit("connectedClients", connectedClients);
  }

  handleDisconnect(client: any) {
    console.log(`[SERVER] Client id:${client.id} disconnected`);
  }

  @SubscribeMessage("ping")
  async handleMessage(client: any, data: any) {
    console.log("[SERVER] PING");
    console.log(`[SERVER] Message received from client id: ${client.id}`);
    console.log(`[SERVER] Payload: ${data}`);
    return {
      event: "pong",
      data,
    };
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: any, room: string): void {
    client.join(room);
    this.io
      .to(room)
      .emit("userJoined", `${client.data.user.name} joined the room.`);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: any, room: string): void {
    client.leave(room);
    this.io
      .to(room)
      .emit("userLeft", `${client.data.user.name} left the room.`);
  }

  @SubscribeMessage("startTyping")
  handleStartTyping(client: any, room: string): void {
    this.io
      .to(room)
      .emit("userTyping", { userName: client.data.user.name, isTyping: true });
  }

  @SubscribeMessage("stopTyping")
  handleStopTyping(client: any, room: string): void {
    this.io
      .to(room)
      .emit("userTyping", { userName: client.data.user.name, isTyping: false });
  }

  @SubscribeMessage("chatMessage")
  handleChatMessage(
    client: any,
    payload: any,
    @ConnectedSocket() socket: Socket,
  ): void {
    // ... process message

    // Acknowledge that the message was received
    socket.emit("messageAcknowledged", {
      messageId: payload.messageId,
      status: "received",
    });
  }

  @SubscribeMessage("presenceUpdate")
  handlePresenceUpdate(client: any): void {
    // Broadcast user's online status to all connected clients
    this.io.emit("userOnline", {
      name: client.data.user.name,
      isOnline: true,
    });
  }

  @SubscribeMessage("getChatHistory")
  async handleGetChatHistory(client: any, room: string): Promise<void> {
    // Retrieve chat history from MongoDB
    const chatHistory = await this.chatsService.findOne(room);

    // Send the chat history to the client
    client.emit("chatHistory", chatHistory);
  }

  @SubscribeMessage("systemNotification")
  handleSystemNotification(client: any, payload: any): void {
    // Broadcast the system notification to all clients
    this.io.emit("systemNotification", payload);
  }

  // TODO
  // - Edit Message
  // - Delete Message
  // - File and Image Sharing
  // - Mention Notification
  // - Etc.
}
