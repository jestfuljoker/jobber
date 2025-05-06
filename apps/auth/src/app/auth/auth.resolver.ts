import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { GqlContext } from '~/jobber/nestjs';
import { AuthService } from '~/ms-auth/app/auth/auth.service';
import { LoginInput } from '~/ms-auth/app/auth/dto/login.input';
import { User } from '~/ms-auth/app/users/models/user.model';

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => User)
	async login(@Args('loginInput') loginInput: LoginInput, @Context() context: GqlContext) {
		return this.authService.login(loginInput, context.res);
	}
}
