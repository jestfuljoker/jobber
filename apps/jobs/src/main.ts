import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from '~/jobs/app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const globalPrefix = 'api';

	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.use(cookieParser());

	const port = configService.getOrThrow('PORT');

	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
