import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '~/ms-auth/app/auth/auth.service';
import { UsersService } from '~/ms-auth/app/users/users.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: {},
				},
				{
					provide: JwtService,
					useValue: {},
				},
				{
					provide: ConfigService,
					useValue: {},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
