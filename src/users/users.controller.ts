import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Controller, Get, Post, Body, Param, Delete, Put, Res, Req } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post('register')
  async register(@Body() user:UserDto):Promise<UserDto>{
    return this.userService.register(user);
  }

  @Post('login')
  async login(@Body() user:any, @Res({passthrough: true}) response: Response){
    return this.userService.login(user, response);
  }

  @Post('logout')
  async logout( @Res({passthrough: true}) response: Response){
    return this.userService.logout(response);
  }

  @Get()
  getAll(@Req() request: Request) {
    return this.userService.findAll(request);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.findOneUser(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() userData: UserDto){
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number){
    return this.userService.deleteById(id);
  }
}
