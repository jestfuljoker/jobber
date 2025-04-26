import { Job } from '~/app/decorators/job.decorator';
import { AbstractJob } from '~/app/jobs/abstract.job';

@Job({
	name: 'Fibonacci',
	description: 'Generate a Fibonacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob {}
