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
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorResponseDto } from '@/dto/error-response.dto';
import { ResponseCreateUserDto } from './dto/resposne-create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    try {
      const newUser = await this.usersService.registerUser(
        createUserDto.username,
        createUserDto.password,
        createUserDto.displayName,
      );
      const responseUser = {
        id: newUser.id,
        displayName: newUser.displayName,
        username: newUser.username,
      };

      return responseUser;
    } catch (error) {
      const errorResponse = new ErrorResponseDto(
        error.response.statusCode || HttpStatus.BAD_REQUEST,
        error.message,
        error.response.error || 'BadRequestError',
      );
      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
  }
}
