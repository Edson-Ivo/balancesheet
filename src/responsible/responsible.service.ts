import {Injectable} from "@nestjs/common";
import * as moment from "moment";
import {ResponsibleCreateInDTO} from "./dto/create-in.dto";
import {ResponsibleCreateDTO} from "./dto/create.dto";
import {ResponsibleRepository} from "./responsible.respository";

@Injectable()
export class ResponsibleService {
  constructor(private responsibleRepository: ResponsibleRepository) {}

  async create(companyId: string, createToResponsible: ResponsibleCreateInDTO) {
    const data = new Date(createToResponsible.date);

    const responsibleDTO = new ResponsibleCreateDTO();

    responsibleDTO.companyId = companyId;
    responsibleDTO.date = moment()
      .month(data.getMonth() - 1)
      .year(data.getFullYear())
      .startOf("month")
      .toDate();

    await this.responsibleRepository.store(responsibleDTO);

    return responsibleDTO;
  }
}
