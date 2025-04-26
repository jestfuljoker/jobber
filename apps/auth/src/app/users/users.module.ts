import { Module } from '@nestjs/common';

import { PrismaModule } from '~/app/prisma/prisma.module';
import { UsersResolver } from '~/app/users/users.resolver';
import { UsersService } from '~/app/users/users.service';

@Module({
	imports: [PrismaModule],
	providers: [UsersResolver, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
