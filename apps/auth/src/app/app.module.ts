import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from '~/app/prisma/prisma.module';
import { UsersModule } from '~/app/users/users.module';

@Module({
	imports: [
		ConfigModule,
		PrismaModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
		}),
		UsersModule,
	],
})
export class AppModule {}
