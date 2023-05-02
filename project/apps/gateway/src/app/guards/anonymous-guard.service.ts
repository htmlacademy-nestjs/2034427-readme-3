import {BadRequestException, CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class AnonymousGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      throw new BadRequestException('You is authorized')
    }
    return true;
  }
}
