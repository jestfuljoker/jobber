import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '~/app/users/dto/create-user.input';
import { User } from '~/app/users/models/user.model';
import { UsersService } from '~/app/users/users.service';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.usersService.createUser(createUserInput);
	}

	@Query(() => [User], { name: 'users' })
	async getUsers() {
		return this.usersService.getUsers();
	}
}
