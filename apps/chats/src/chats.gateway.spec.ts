import {Test} from '@nestjs/testing';
import {ChatGateway} from './chats.gateway';
import {INestApplication} from '@nestjs/common';
import {Socket, io} from 'socket.io-client';

async function createNestApp(...gateways: any): Promise<INestApplication> {
    const testingModule = await Test.createTestingModule({
        providers: gateways,
    }).compile();
    return testingModule.createNestApplication();
}

async function eventReception(from: Socket, event: string): Promise<void> {
    return new Promise<void>((resolve) => {
        from.on(event, () => {
            resolve();
        });
    });
}

describe('ChatGateway', () => {
    let gateway: ChatGateway;
    let app: INestApplication;
    let ioClient: Socket;

    beforeEach(async () => {
        // Instantiate the app
        // app = await createNestApp(ChatGateway);
        // Get the gateway instance from the app instance
        // gateway = app.get<ChatGateway>(ChatGateway);
        // Create a new client that will interact with the gateway
        ioClient = io('http://localhost:3000', {
            autoConnect: false,
            transports: ['websocket', 'polling'],
        });

        // app.listen(3000);
    });

    // afterEach(async () => {
    //     await app.close();
    // });

    // it('should be defined', () => {
    //     expect(gateway).toBeDefined();
    // });

    it("should emit 'pong' on 'ping'", async () => {
        ioClient.on("connect", () => {
            console.log("[CLIENT] connected");
        });

        ioClient.on("pong", (data) => {
            expect(data).toBe("Hello world!");
        });

        ioClient.connect();
        await eventReception(ioClient, "connect");

        ioClient.emit("ping", "Hello world!");
        await eventReception(ioClient, "pong");

        ioClient.disconnect();
    });

    it("should emit 'chatHistory' on 'getChatHistory'", async () => {
        ioClient.on("connect", () => {
            console.log("[CLIENT] connected");
        });

        ioClient.on("getChatHistory", (data) => {
            console.log("data",data)
            expect(data).toBeDefined();
        });

        ioClient.connect();
        await eventReception(ioClient, "connect");

        ioClient.emit("getChatHistory", "65533faf240835f80049cebb");
        await eventReception(ioClient, "chatHistory");

        ioClient.disconnect();
    });
});