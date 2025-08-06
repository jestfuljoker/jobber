import { Module } from '@nestjs/common';

import { PulsarClient } from '~/jobber/pulsar';

@Module({
	controllers: [],
	providers: [PulsarClient],
	exports: [PulsarClient],
})
export class PulsarModule {}
