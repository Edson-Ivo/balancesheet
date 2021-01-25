import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from "@nestjs/common";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err =>
          throwError(
            new HttpException(
              {
                message: err.message,
                badFields: err.badFields ?? undefined,
                statusCode: err.statusCode,
              },
              err.statusCode,
            ),
          ),
        ),
      );
  }
}
