import { Injectable } from '@nestjs/common';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { GulaSocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private readonly gulaSocketGateway: GulaSocketGateway) {}

  async emitEventNewPost(payload: any) {
    this.gulaSocketGateway.handleNewPost(payload);
  }

  async emitAddOrSubtractFood(payload: any) {
    this.gulaSocketGateway.handleAddOrSubtractFood(payload);
  }
}
