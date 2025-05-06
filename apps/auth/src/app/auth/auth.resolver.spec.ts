import { Test, TestingModule } from '@nestjs/testing';

import { AuthResolver } from '~/auth/app/auth/auth.resolver';
import { AuthService } from '~/auth/app/auth/auth.service';

describe('AuthResolver', () => {
	let resolver: AuthResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthResolver,
				{
					provide: AuthService,
					useValue: {},
				},
			],
		}).compile();

		resolver = module.get<AuthResolver>(AuthResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
