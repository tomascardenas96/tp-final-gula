import { Module } from '@nestjs/common';
import { GulaSocketGateway } from './socket.gateway';

@Module({
  providers: [GulaSocketGateway],
  exports: [GulaSocketGateway]
})
export class SocketModule {}
