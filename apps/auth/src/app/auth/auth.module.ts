import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthResolver } from '~/app/auth/auth.resolver';
import { AuthService } from '~/app/auth/auth.service';
import { JwtStrategy } from '~/app/auth/strategies/jwt.strategy';
import { UsersModule } from '~/app/users/users.module';

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
})
export class AuthModule {}
