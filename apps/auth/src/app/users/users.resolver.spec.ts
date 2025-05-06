import { Test, TestingModule } from '@nestjs/testing';

import { UsersResolver } from '~/ms-auth/app/users/users.resolver';
import { UsersService } from '~/ms-auth/app/users/users.service';
describe('UsersResolver', () => {
	let resolver: UsersResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersResolver,
				{
					provide: UsersService,
					useValue: {},
				},
			],
		}).compile();

		resolver = module.get<UsersResolver>(UsersResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
