import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../@common/entities/user.entity";

@Injectable()
export abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<User>;

abstract get(id: number): Promise<User | null>;

abstract getUserByEmail(email: string): Promise<User & { password: string } | null>
}