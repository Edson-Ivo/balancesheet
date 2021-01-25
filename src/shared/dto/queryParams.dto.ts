import {IsNumberString, IsOptional} from "class-validator";
export class QueryParams {
  @IsNumberString()
  @IsOptional()
  perPage: number;

  @IsNumberString()
  @IsOptional()
  page: number;
}
