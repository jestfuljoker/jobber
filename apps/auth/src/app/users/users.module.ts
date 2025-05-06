import { Module } from '@nestjs/common';

import { PrismaModule } from '~/auth/app/prisma/prisma.module';
import { UsersResolver } from '~/auth/app/users/users.resolver';
import { UsersService } from '~/auth/app/users/users.service';

@Module({
	imports: [PrismaModule],
	providers: [UsersResolver, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
