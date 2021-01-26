import {IsDate, IsOptional, IsString} from "class-validator";
import {BalanceSheetDTO} from "../balancesheet/dto/balancesheet.dto";

export class ResponsibleDTO {
  _id: string;
  @IsString()
  companyId: string;
  @IsOptional()
  @IsDate()
  date: Date;
  balanceSheet: BalanceSheetDTO[];
  constructor(
    _id: string,
    companyId: string,
    date: Date,
    balanceSheet: BalanceSheetDTO[],
  ) {
    this._id = _id;
    this.companyId = companyId;
    this.date = date;
    this.balanceSheet = balanceSheet;
  }
}
