import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';

import { LoginInput } from '~/auth/app/auth/dto/login.input';
import { TokenPayload } from '~/auth/app/auth/interfaces/token-payload.interface';
import { UsersService } from '~/auth/app/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async login({ email, password }: LoginInput, response: Response) {
		const user = await this.verifyUser(email, password);

		const expires = new Date();

		expires.setMilliseconds(
			expires.getMilliseconds() + parseInt(this.configService.getOrThrow('JWT_EXPIRATION_MS')),
		);

		const tokenPayload: TokenPayload = {
			userId: user.id,
		};

		const accessToken = this.jwtService.sign(tokenPayload);

		response.cookie('Authentication', accessToken, {
			httpOnly: true,
			secure: this.configService.get('NODE_ENV') === 'production',
			expires,
		});

		return user;
	}

	private async verifyUser(email: string, password: string) {
		try {
			const user = await this.usersService.getUser({ email });

			const passwordMatches = await compare(password, user.password);

			if (!passwordMatches) {
				throw new UnauthorizedException('Invalid credentials');
			}

			return user;
		} catch {
			throw new UnauthorizedException('Invalid credentials');
		}
	}
}
