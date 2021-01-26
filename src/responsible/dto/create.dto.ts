import {IsDate, IsOptional, IsString} from "class-validator";

export class ResponsibleCreateDTO {
  _id: string;
  @IsString()
  companyId: string;
  @IsOptional()
  @IsDate()
  date: Date;
}
