import {IsDecimal, IsNumber, IsString} from "class-validator";
import {ResponsibleDTO} from "src/responsible/dto/responsible.dto";
import {ResponsibleNotWithRelationsDTO} from "src/responsible/dto/responsibleNotRelations.dto";
import {Responsible} from "src/responsible/responsible.entity";

export class BalancesheetCreateDTO {
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
  responsible: ResponsibleNotWithRelationsDTO;
}
