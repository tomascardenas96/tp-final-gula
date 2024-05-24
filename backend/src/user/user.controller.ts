import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('filter')
  findUserByQuery(@Query('name') name: string) {
    return this.userService.findUserByQuery(name);
  }

  @Get('profile')
  findProfileByActiveUser(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.userService.findProfileByActiveUser(activeUser);
  }
}
