import {PipeTransform, Injectable, ArgumentMetadata} from "@nestjs/common";
import {validate, ValidationError} from "class-validator";
import {plainToClass} from "class-transformer";
import {AppError} from "../error/AppError";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, {metatype}: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const failedFields = this.getFailedFields(errors);
      throw new AppError(
        "Valores informados não correspondem aos esperados",
        400,
        failedFields,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private getFailedFields(errors: ValidationError[]) {
    let failedContrains: string[] = [];
    errors.forEach(error => {
      const errorsPerField = Object.values(error.constraints);
      failedContrains.push(...errorsPerField);
    });
    return failedContrains;
  }
}
