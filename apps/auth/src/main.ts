import { join } from 'node:path';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import cookieParser from 'cookie-parser';

import { AUTH_PACKAGE_NAME } from '~/jobber/types/proto/auth';
import { AppModule } from '~/ms-auth/app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const globalPrefix = 'api';

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.setGlobalPrefix(globalPrefix);
	app.use(cookieParser());

	const port = configService.getOrThrow('PORT');

	app.connectMicroservice<GrpcOptions>({
		transport: Transport.GRPC,
		options: {
			package: AUTH_PACKAGE_NAME,
			protoPath: join(__dirname, 'proto', 'auth.proto'),
		},
	});

	await app.startAllMicroservices();

	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
