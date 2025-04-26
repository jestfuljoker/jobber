import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/auth';
import { hash } from 'bcryptjs';

import { PrismaService } from '~/app/prisma/prisma.service';
import { CreateUserInput } from '~/app/users/dto/create-user.input';
import { User } from '~/app/users/models/user.model';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async createUser({ email, password }: CreateUserInput): Promise<User> {
		const user = await this.prismaService.user.create({
			data: {
				email,
				password: await hash(password, 10),
			},
		});

		return user;
	}

	async getUsers(): Promise<User[]> {
		return this.prismaService.user.findMany();
	}

	async getUser(args: Prisma.UserWhereUniqueInput) {
		return this.prismaService.user.findUniqueOrThrow({ where: args });
	}
}
