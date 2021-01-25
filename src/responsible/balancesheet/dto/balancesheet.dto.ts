import {IsDecimal, IsNumber, IsString} from "class-validator";

export class BalanceSheetDTO {
  @IsNumber()
  i: number;
  @IsString()
  classification: string;
  @IsString()
  description: string;
  @IsString()
  description_nd: string;
  @IsDecimal()
  initialCash: number;
  @IsDecimal()
  debit: number;
  @IsDecimal()
  credit: number;
  @IsDecimal()
  finalCash: number;

  constructor(
    i: number,
    classification: string,
    description: string,
    description_nd: string,
    initialCash: number,
    debit: number,
    credit: number,
    finalCash: number,
  ) {
    this.i = i;
    this.classification = classification;
    this.description = description;
    this.description_nd = description_nd;
    this.initialCash = initialCash;
    this.debit = debit;
    this.credit = credit;
    this.finalCash = finalCash;
  }
}
