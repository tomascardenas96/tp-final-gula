import {
  WebSocketGateway as WebSocketGatewayDecorator,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { Server } from 'socket.io';

@WebSocketGatewayDecorator(8001, { cors: '*' })
export class GulaSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  handleNewPost(payload: any) {
    this.server.emit('newPostSocket', payload);
  }
}
