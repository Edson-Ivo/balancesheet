import {IsDate, IsOptional, IsString} from "class-validator";

export class ResponsibleDTO {
  _id: string;
  @IsString()
  companyId: string;
  @IsOptional()
  @IsDate()
  date: Date;

  constructor(_id: string, companyId: string, date: Date) {
    this._id = _id;
    this.companyId = companyId;
    this.date = date;
  }
}
