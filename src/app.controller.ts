import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class AppController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllUsers() {
    return this.client.send({ cmd: 'get_users' }, {});
  }

  @Get(':username')
  getUserByName(@Param('username') username) {
    return this.client.send({ cmd: 'get_user' }, username);
  }

  @Post()
  createNewUser(@Body() user: UserDTO) {
    return this.client.send({ cmd: 'new_user' }, user);
  }
}
