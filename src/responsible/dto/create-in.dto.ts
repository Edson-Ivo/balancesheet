import {IsDateString, IsOptional} from "class-validator";

export class ResponsibleCreateInDTO {
  _id: string;
  @IsOptional()
  @IsDateString()
  date: Date;

  constructor(_id: string, date: Date) {
    this._id = _id;
    this.date = date;
  }
}
