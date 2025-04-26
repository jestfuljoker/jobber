import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Module } from '@nestjs/common';

import { FibonacciJob } from '~/app/jobs/fibonacci.job';
import { JobsResolver } from '~/app/jobs/jobs.resolver';
import { JobsService } from '~/app/jobs/jobs.service';

@Module({
	imports: [DiscoveryModule],
	providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
