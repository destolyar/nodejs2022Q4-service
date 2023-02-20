import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { validate as uuidValidate } from 'uuid'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/')
  async getUsers(@Res() response: Response) {
    const users = await this.usersService.getUsers()

    response.json(users)
  }

  @Get(':id')
  async getUserById(@Param() params, @Res() response: Response) {
    const userId = params.id

    const isValidId = uuidValidate(userId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const findedUser = await this.usersService.getUserById(userId)
    if (!findedUser) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    response.json(findedUser)
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const createdUser = await this.usersService.createUser(createUserDto)
    const userWithoutPassword = { ...createdUser }
    delete userWithoutPassword.password 

    response.json(userWithoutPassword)
  }

  @Put(':id')
  async updateUserPassword(@Body() updatePasswordDto: UpdatePasswordDto, @Param() params, @Res() response: Response) {
    const userId = params.id

    const isValidId = uuidValidate(userId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.getUserById(userId)
    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.usersService.updateUserPassword(updatePasswordDto, userId, user)
    if (!updatedUser) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    const userWithoutPassword = { ...updatedUser }
    delete userWithoutPassword.password

    response.json(userWithoutPassword)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(@Param() params, @Res() response: Response) {
    const userId = params.id

    const isValidId = uuidValidate(userId)
    if (!isValidId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const userForDeleting = await this.usersService.getUserById(userId)
    if (!userForDeleting) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const deletedUser = await this.usersService.deleteUserById(userId)

    response.json(deletedUser)
  }
}