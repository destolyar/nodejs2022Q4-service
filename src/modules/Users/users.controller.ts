import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response, response } from 'express';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { validate as uuidValidate } from 'uuid'
import db from 'src/database/db';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/')
  getUsers(@Res() response: Response) {
    const users = this.usersService.getUsers()

    response.json(users)
  }

  @Get(':id')
  getUserById(@Param() params, @Res() response: Response) {
    const userId = params.id
    
    const isValidId = uuidValidate(userId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedUser = this.usersService.getUserById(userId)
    if (!findedUser) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(findedUser)
  }

  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const createdUser = this.usersService.createUser(createUserDto)
    const userWithoutPassword = {...createdUser}
    delete userWithoutPassword.password

    response.json(userWithoutPassword)
  }

  @Put(':id')
  updateUserPassword(@Body() updatePasswordDto: UpdatePasswordDto, @Param() params, @Res() response: Response) {
    const userId = params.id

    const isValidId = uuidValidate(userId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const user = this.usersService.getUserById(userId)
    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedUser = this.usersService.updateUserPassword(updatePasswordDto, userId, user)
    if (!updatedUser) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    const userWithoutPassword = {...updatedUser}
    delete userWithoutPassword.password

    response.json(userWithoutPassword)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUserById(@Param() params, @Res() response: Response) {
    const userId = params.id

    const isValidId = uuidValidate(userId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const userForDeleting = this.usersService.getUserById(userId)
    if (!userForDeleting) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    this.usersService.deleteUserById(userId)

    response.json(userForDeleting)
  }
}