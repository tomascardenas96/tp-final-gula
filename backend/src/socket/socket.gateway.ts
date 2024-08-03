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

  handleAddFoodInCart(addedFood: any) {
    this.server.emit('addFoodInCart', addedFood);
  }

  handleAddFoodExistentInCart(existentFood: any) {
    this.server.emit('modifyQuantityWhenExists', existentFood);
  }

  handleUploadPreferencesOfMercadoPago(foodOnCart: any) {
    this.server.emit('uploadPreferences', foodOnCart);
  }

  handleFinishPurchase(cleanCart: any) {
    this.server.emit('finishPurchase', cleanCart);
  }

  handleFailedPurchase(error: any) {
    this.server.emit('failedPurchase', error);
  }
}
