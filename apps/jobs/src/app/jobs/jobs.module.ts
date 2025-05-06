import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Module } from '@nestjs/common';

import { FibonacciJob } from '~/jobs/app/jobs/fibonacci.job';
import { JobsResolver } from '~/jobs/app/jobs/jobs.resolver';
import { JobsService } from '~/jobs/app/jobs/jobs.service';

@Module({
	imports: [DiscoveryModule],
	providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
