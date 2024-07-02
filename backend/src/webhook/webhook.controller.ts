import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webHookService: WebhookService) {}

  @Post()
  handleWebhook(@Body() webHookData: any) {
    return this.webHookService.handleWebhook(webHookData);
  }
}
