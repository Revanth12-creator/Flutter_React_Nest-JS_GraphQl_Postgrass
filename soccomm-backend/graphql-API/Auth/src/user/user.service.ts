import { FacebookInput } from './dto/facebook-user.input';
import { GoogleInput } from './dto/google-user.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Address } from 'src/address/entities/address.entity';
import { MonthsArrayInput } from './dto/monthsArray';
import { Between } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const { email, role, password, username, avatar, isactive, lastLogin } =
      createUserInput;
    const pass = await this.hashPassword(password);
    const user = await this.userRepo.create({
      email,
      password: pass,
      role,
      avatar,
      username,
      isactive,
      lastLogin,
    });
    return this.userRepo.save(user);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
  findAll() {
    return this.userRepo.find({ relations: ['address'] });
  }

  findOne(id: string) {
    return this.userRepo.findOne(id, { relations: ['address'] });
  }

  findUser(email: string) {
    return this.userRepo.findOne({ email });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const u = await this.userRepo.create(updateUserInput);
    await this.userRepo.update(id, u);
    const USER = await this.userRepo.findOne(id);
    return USER;
  }

  remove(id: string) {
    return this.userRepo.delete(id);
  }

  createbyGoogle(user: GoogleInput) {
    const create = this.userRepo.create(user);
    return this.userRepo.save(create);
  }

  updatebyGoogle(googleId: string, user: GoogleInput) {
    return this.userRepo.update({ googleId }, user);
  }

  findByGoogleId(googleId: string): Promise<User> {
    return this.userRepo.findOne({ googleId });
  }
  createbyFacebookId(user: FacebookInput) {
    const create = this.userRepo.create(user);
    return this.userRepo.save(create);
  }

  updatebyFacebookId(facebookId: string, user: FacebookInput) {
    return this.userRepo.update({ facebookId }, user);
  }

  findByFacebookId(facebookId: string): Promise<User> {
    return this.userRepo.findOne({ facebookId });
  }
  findAllusers(id) {
    return this.userRepo.find({ where: { id: id } });
  }

  findProfilePath(avatar) {
    return this.userRepo.findOne({ avatar });
  }

  async findCount() {
    return await this.userRepo.count();
  }

  async findByPhone(phonenumber: string) {
    const address = await this.addressRepo.findOne({ phonenumber });
    return this.userRepo.findOne(address.userId);
  }

  async findPhone(phonenumber: string) {
    const address = await this.addressRepo.findOne({ phonenumber });
    return address;
  }

  async getCountOfActiveAndInactiveUsers(fromDate, toDate) {
    let count: Number[] = [];
    let activeUsers: number = await this.userRepo.count({
      where: {
        createdAt: Between(fromDate, toDate),
        isactive: true,
      },
    });
    let inactiveUsers: number = await this.userRepo.count({
      where: {
        createdAt: Between(fromDate, toDate),
        isactive: false,
      },
    });
    count.push(activeUsers, inactiveUsers);
    console.log('count is', count);
    return count;
  }

  async getUserCountForGraph(monthsArray: MonthsArrayInput[]) {
    let count: number[] = [];
    for (let i = 0; i < monthsArray.length; i++) {
      console.log('months', monthsArray[i]);
      let { fromDate, toDate } = monthsArray[i];
      const userCount = await this.userRepo.count({
        where: {
          createdAt: Between(fromDate, toDate),
        },
      });
      count.push(userCount);
    }
    console.log('user count', count);
    return await count;
  }

  async getUsersByStatus(isActive: boolean, fromDate: string, toDate: string) {
    let users = await this.userRepo.find({
      where: {
        createdAt: Between(fromDate, toDate),
        isactive: isActive,
      },
      relations: ['address'],
    });
    return users;
  }

  async findAllInRange(fromDate: string, toDate: string) {
    return await this.userRepo.find({
      where: {
        createdat: Between(fromDate, toDate),
      },
      relations: ['address'],
    });
  }
}
