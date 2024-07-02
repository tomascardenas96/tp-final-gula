import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webHookService: WebhookService) {}

  @Post()
  handleWebhook(@Body() webHookData: any) {
    return this.webHookService.handleWebhook(webHookData);
  }
}
