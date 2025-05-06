import { Module } from '@nestjs/common';

import { PrismaService } from '~/ms-auth/app/prisma/prisma.service';

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
