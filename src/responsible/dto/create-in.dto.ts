import {IsDateString, IsOptional} from "class-validator";
import {BalancesheetCreateDTO} from "../balancesheet/dto/create.dto";

export class ResponsibleCreateInDTO {
  _id: string;
  @IsOptional()
  @IsDateString()
  date: Date;
  balancesheet: BalancesheetCreateDTO[];

  constructor(_id: string, date: Date, balancesheet: BalancesheetCreateDTO[]) {
    this._id = _id;
    this.date = date;
    this.balancesheet = balancesheet;
  }
}
