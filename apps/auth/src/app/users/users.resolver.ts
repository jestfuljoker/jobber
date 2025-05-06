import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '~/ms-auth/app/auth/guards/gql-auth.guard';
import { CreateUserInput } from '~/ms-auth/app/users/dto/create-user.input';
import { User } from '~/ms-auth/app/users/models/user.model';
import { UsersService } from '~/ms-auth/app/users/users.service';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.usersService.createUser(createUserInput);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => [User], { name: 'users' })
	async getUsers() {
		return this.usersService.getUsers();
	}
}
