import { Module } from '@nestjs/common';

import { PrismaModule } from '~/ms-auth/app/prisma/prisma.module';
import { UsersResolver } from '~/ms-auth/app/users/users.resolver';
import { UsersService } from '~/ms-auth/app/users/users.service';

@Module({
	imports: [PrismaModule],
	providers: [UsersResolver, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
