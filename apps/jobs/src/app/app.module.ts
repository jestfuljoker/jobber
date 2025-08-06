import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { JobsModule } from '~/ms-jobs/app/jobs.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
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
