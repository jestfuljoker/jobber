import { Job } from '~/ms-jobs/app/decorators/job.decorator';
import { AbstractJob } from '~/ms-jobs/app/jobs/abstract.job';

@Job({
	name: 'Fibonacci',
	description: 'Generate a Fibonacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob {}
