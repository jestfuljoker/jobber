import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '~/ms-auth/app/auth/auth.controller';
import { AuthResolver } from '~/ms-auth/app/auth/auth.resolver';
import { AuthService } from '~/ms-auth/app/auth/auth.service';
import { JwtStrategy } from '~/ms-auth/app/auth/strategies/jwt.strategy';
import { UsersModule } from '~/ms-auth/app/users/users.module';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.getOrThrow('JWT_EXPIRATION_MS'),
				},
			}),
			inject: [ConfigService],
		}),
		UsersModule,
	],
	providers: [AuthResolver, AuthService, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
