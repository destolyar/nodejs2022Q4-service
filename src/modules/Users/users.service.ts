import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdatePasswordDto } from "./dto";
import { UserInterface } from "./usersInterface";
import db from "src/database/db";
import {v4 as uuidv4} from "uuid"

@Injectable()
export class UsersService {
  getUsers() {
    return db.findMany("users")
  }

  getUserById(userId: string): UserInterface | null {
    const user = db.findOne("users", "id", userId)
    return user
  }

  createUser(createUserDto: CreateUserDto) {
    const timeOfCreating = Date.now()

    const userForInsert: UserInterface = {
      id: uuidv4(),
      createdAt: timeOfCreating,
      updatedAt: timeOfCreating,
      version: 1,
      ...createUserDto
    }

    db.insertOne("users", userForInsert)

    return userForInsert
  }
  
  updateUserPassword(updatePassworDto: UpdatePasswordDto, userId: string, user: UserInterface) {            
    const isOldPasswordCorrect = updatePassworDto.oldPassword === user.password
    if(!isOldPasswordCorrect) {
      return null
    }

    const timeOfUpdate = Date.now()

    const updatedUser = db.rewriteOne("users", {
      ...user,
      updatedAt: timeOfUpdate,
      version: user.version + 1,
      password: updatePassworDto.newPassword
    }, user.id)

    db.rewriteOne("users", updatedUser, userId)

    return updatedUser
  }

  deleteUserById(id: string) {
    const deletedUser = db.deleteOne("users", id)
    return deletedUser
  }
}