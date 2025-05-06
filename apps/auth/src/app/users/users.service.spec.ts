import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '~/ms-auth/app/prisma/prisma.service';
import { UsersService } from '~/ms-auth/app/users/users.service';

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: PrismaService,
					useValue: {},
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
