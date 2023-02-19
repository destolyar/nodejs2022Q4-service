import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdatePasswordDto } from "./dto";
import { UserInterface } from "./usersInterface";
import { v4 as uuidv4 } from "uuid"
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  @InjectRepository(User) private usersRepository: Repository<User>

  async getUsers() {
    const users = await this.usersRepository.find()
    return users
  }

  async getUserById(userId: string): Promise<UserInterface | null> {
    const user = await this.usersRepository.findOneBy({ id: userId })
    return user
  }

  async createUser(createUserDto: CreateUserDto) {
    const timeOfCreating = Date.now()

    const userForInsert: UserInterface = {
      id: uuidv4(),
      createdAt: timeOfCreating,
      updatedAt: timeOfCreating,
      version: 1,
      ...createUserDto
    }

    await this.usersRepository.insert(userForInsert)
    return userForInsert
  }

  async updateUserPassword(updatePassworDto: UpdatePasswordDto, userId: string, user: UserInterface) {
    const isOldPasswordCorrect = updatePassworDto.oldPassword === user.password
    if (!isOldPasswordCorrect) {
      return null
    }

    const timeOfUpdate = Date.now()
    const userForUpdate = {
      ...user,
      updatedAt: timeOfUpdate,
      version: user.version + 1,
      password: updatePassworDto.newPassword
    }

    await this.usersRepository.update(userId, userForUpdate)

    const updatedUser = {
      ...userForUpdate,
      updatedAt: +userForUpdate.updatedAt,
      createdAt: +userForUpdate.createdAt
    }

    return updatedUser
  }

  async deleteUserById(userId: string) {
    const deletedUser = await this.usersRepository.delete({ id: userId })
    return deletedUser
  }
}