import { UserEntity } from './entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Between,
  FindOperator,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = { ...new UserEntity(), ...createUserDto };
    return await this.userRepository.save(user);
  }

  async findAll(dateFrom?: Date, dateTo?: Date): Promise<UserEntity[]> {
    if (!dateFrom && !dateTo) {
      return await this.userRepository.find();
    } else {
      let findOperator: FindOperator<Date> = null;
      if (dateFrom && !dateTo) {
        findOperator = MoreThanOrEqual(new Date(dateFrom));
      } else if (!dateFrom && dateTo) {
        findOperator = LessThanOrEqual(new Date(dateTo));
      } else {
        findOperator = Between(new Date(dateFrom), new Date(dateTo));
      }

      return await this.userRepository.findBy({
        created_at: findOperator,
      });
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no se encontró`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    let user = await this.findOne(id);
    user = { ...user, ...updateUserDto };
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<any> {
    const user = await this.findOne(id);
    return await this.userRepository.delete(id);
  }

  async changeActive(id: number): Promise<UserEntity> {
    const user = await this.findOne(id);
    user.active = !user.active;
    return await this.userRepository.save(user);
  }
}
