import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
	AuthenticateRequest,
	AuthServiceController,
	AuthServiceControllerMethods,
	User,
} from '~/jobber/types/proto/auth';
import { JwtAuthGuard } from '~/ms-auth/app/auth/guards/jwt-auth.guard';
import { TokenPayload } from '~/ms-auth/app/auth/interfaces/token-payload.interface';
import { UsersService } from '~/ms-auth/app/users/users.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	authenticate(
		request: AuthenticateRequest & { user: TokenPayload },
	): Promise<User> | Observable<User> | User {
		return this.usersService.getUser({ id: request.user.userId });
	}
}
