import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../@common/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

export const TYPEORM_USER_REPOSITORY =
  'TYPEORM_USER_REPOSITORY' as const;

@Injectable()
export class UserTypeOrmRepository {
  constructor(
    @Inject(TYPEORM_USER_REPOSITORY)
    private readonly repository: Repository<User>,
  ) {}

  getUserByEmail(
    email: string,
  ): Promise<(User & { passwordHash: string }) | null> {
    return this.repository.findOne({
      select: {
        passwordHash: true,
        name: true,
        email: true,
        role: true,
        id: true,
      },
      where: {
        email,
      },
    });
  }

  async get(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async create(user: CreateUserDto): Promise<User> {
    const userEntity = await this.repository.create(user);
    const savedUser = await this.repository.save(userEntity);

    savedUser.passwordHash = '';
    return savedUser;
  }  
}