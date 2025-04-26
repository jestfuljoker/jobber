import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from '~/app/prisma/prisma.module';
import { UsersModule } from '~/app/users/users.module';

import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule,
		PrismaModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			context: ({ req, res }) => ({ req, res }),
			autoSchemaFile: true,
			playground: {
				settings: {
					'request.credentials': 'include',
				},
			},
		}),
		UsersModule,
		AuthModule,
	],
})
export class AppModule {}
