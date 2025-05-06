import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	Logger,
	OnModuleInit,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, map, Observable, of } from 'rxjs';

import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, AuthServiceClient } from '~/jobber/types/proto/auth';

@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
	private readonly logger = new Logger(GqlAuthGuard.name);
	private authService: AuthServiceClient;

	constructor(@Inject(AUTH_PACKAGE_NAME) private readonly grpcClient: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.grpcClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const token = this.getRequest(context).cookies?.Authentication;

		if (!token) {
			return false;
		}

		return this.authService.authenticate({ token }).pipe(
			map((user) => {
				this.getRequest(context).user = user;
				return true;
			}),
			catchError((err) => {
				this.logger.error(err);
				return of(false);
			}),
		);
	}

	private getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);

		return ctx.getContext().req;
	}
}
