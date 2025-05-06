import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { JobsModule } from '~/jobs/app/jobs/jobs.module';

@Module({
	imports: [
		ConfigModule,
		JobsModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: true,
			driver: ApolloDriver,
			playground: {
				settings: {
					'request.credentials': 'include',
				},
			},
		}),
	],
})
export class AppModule {}
