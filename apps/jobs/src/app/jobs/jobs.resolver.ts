import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '~/jobber/nestjs';
import { ExecuteJobInput } from '~/ms-jobs/app/jobs/dto/execute-job.input';
import { JobsService } from '~/ms-jobs/app/jobs/jobs.service';
import { Job } from '~/ms-jobs/app/jobs/models/job.model';

@Resolver()
export class JobsResolver {
	constructor(private readonly jobsService: JobsService) {}

	@Query(() => [Job], { name: 'jobs' })
	@UseGuards(GqlAuthGuard)
	async getJobs() {
		return this.jobsService.getJobs();
	}

	@Mutation(() => Job)
	async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
		return this.jobsService.executeJob(executeJobInput.name);
	}
}
