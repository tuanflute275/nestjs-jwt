import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from "class-transformer";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config()



@Injectable()
export class UsersService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  async register(data: UserDto): Promise<UserDto> {
    data.password = await bcrypt.hash(data.password, 10);
    let dataReal = plainToInstance(UserDto, data, { excludeExtraneousValues: true })
    delete dataReal.password;
    return this.usersRepository.save(dataReal);
  }

  async login(data: any, response: any) {
    const user = await this.findUserWithEmail(data.email);
    if (!user) {
      throw new BadRequestException('invalid credentials')
    }

    if (!bcrypt.compare(data.password, user.password)) {
      throw new BadRequestException('invalid credentials')
    }
    const payload = { id: user.id, email: user.email }
    const jwt = await this.jwtService.sign(payload, { secret: process.env.SECRET })
    response.cookie('jwt', jwt, { httpOnly: true })
    return { message: 'login success' };
  }

  async logout(response: any){
    response.clearCookie('jwt');
    return {message: 'logout success'}
  }

  async findAll(request: any) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie, { secret: process.env.SECRET });
      if(!data){
        throw new UnauthorizedException();
      }
      const user = await this.findOneUser(data['id'])
      const {password, ...result} = user;
      return result;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async findOneUser(id: number) {
    const userId = this.usersRepository.findOne({
      where: { id: id }
    })
    if (userId == null) {
      // return 'no id'
    }
    return plainToInstance(UserDto, userId, { excludeExtraneousValues: true });
  }


  async findUserWithEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email: email }
    });
  }

  async update(id: number, data: UserDto): Promise<{ result: string }> {
    await this.usersRepository.update(id, data);
    return { result: 'update success' }
  }

  async deleteById(id: number): Promise<{ result: string }> {
    await this.usersRepository.softDelete(id);
    return { result: 'delete success' }
  }
}
