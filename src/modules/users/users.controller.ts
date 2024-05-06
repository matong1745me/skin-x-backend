import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorResponseDto } from '@/dto/error-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.usersService.registerUser(
        createUserDto.username,
        createUserDto.password,
        createUserDto.displayName,
      );
      return newUser;
    } catch (error) {
      const errorResponse = new ErrorResponseDto(
        HttpStatus.BAD_REQUEST,
        error.message,
        'BadRequestError',
      );
      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
  }
}
