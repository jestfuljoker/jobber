import { join } from 'node:path';

import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AUTH_PACKAGE_NAME } from '~/jobber/types/proto/auth';
import { FibonacciJob } from '~/ms-jobs/app/jobs/fibonacci.job';
import { JobsResolver } from '~/ms-jobs/app/jobs/jobs.resolver';
import { JobsService } from '~/ms-jobs/app/jobs/jobs.service';

@Module({
	imports: [
		DiscoveryModule,
		ClientsModule.register([
			{
				name: AUTH_PACKAGE_NAME,
				transport: Transport.GRPC,
				options: {
					package: AUTH_PACKAGE_NAME,
					protoPath: join(__dirname, 'proto', 'auth.proto'),
				},
			},
		]),
	],
	providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
