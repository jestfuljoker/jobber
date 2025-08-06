import { PulsarClient } from '~/jobber/pulsar';
import { Job } from '~/ms-jobs/app/decorators/job.decorator';
import { AbstractJob } from '~/ms-jobs/app/jobs/abstract.job';
import { FibonacciData } from '~/ms-jobs/app/jobs/fibonacci/fibonacci-data.interface';

@Job({
	name: 'Fibonacci',
	description: 'Generate a Fibonacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
	constructor(pulsarClient: PulsarClient) {
		super(pulsarClient);
	}
}
