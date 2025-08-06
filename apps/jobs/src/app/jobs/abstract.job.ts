import { OnModuleDestroy } from '@nestjs/common';
import { Producer } from 'pulsar-client';

import { PulsarClient } from '~/jobber/pulsar';

export abstract class AbstractJob<T> implements OnModuleDestroy {
	private producer: Producer;

	constructor(private readonly pulsarClient: PulsarClient) {}

	async execute(data: T, jobName: string) {
		if (!this.producer) {
			this.producer = await this.pulsarClient.createProducer(jobName);
		}

		await this.producer.send({ data: Buffer.from(JSON.stringify(data)) });
	}

	async onModuleDestroy() {
		await this.producer.close();
	}
}
