import {
  WebSocketGateway as WebSocketGatewayDecorator,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { Food } from 'src/food/entities/food.entity';

@WebSocketGatewayDecorator(8001, { cors: '*' })
export class GulaSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  sendNewPost(post: any) {
    this.server.emit('newPost', post);
  }

  handleAddOrSubtractFood(newAmount: any) {
    this.server.emit('modifiedAmount', newAmount);
  }
}
