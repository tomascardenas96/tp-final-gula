import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { GulaSocketGateway } from './socket.gateway';

@Module({
  providers: [GulaSocketGateway, SocketService],
})
export class SocketModule {}
