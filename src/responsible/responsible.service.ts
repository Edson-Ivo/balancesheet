import {forwardRef, Inject, Injectable} from "@nestjs/common";
import * as moment from "moment";
import {AppError} from "src/shared/error/AppError";
import {BalancesheetService} from "./balancesheet/balancesheet.service";
import {ResponsibleCreateInDTO} from "./dto/create-in.dto";
import {ResponsibleCreateDTO} from "./dto/create.dto";
import {ResponsibleNotWithRelationsDTO} from "./dto/responsibleNotRelations.dto";
import {ResponsibleRepository} from "./responsible.respository";

@Injectable()
export class ResponsibleService {
  constructor(
    private responsibleRepository: ResponsibleRepository,

    @Inject(forwardRef(() => BalancesheetService))
    private balancesheetService: BalancesheetService,
  ) {}

  async import(file) {
    console.log(file);
  }

  async findById(_id: string) {
    const checkResponsible = await this.responsibleRepository.findOne(_id);

    if (!checkResponsible) throw new AppError("Responsible not exists");

    return checkResponsible;
  }

  async findByCompany(companyId: string): Promise<any> {
    const checkExistsCompany = await this.responsibleRepository.findByRelations(
      {
        companyId,
      },
      ["balancesheet"],
    );
    return checkExistsCompany[0];
  }

  async findByCompanyId(
    companyId: string,
  ): Promise<ResponsibleNotWithRelationsDTO> {
    const checkResponsible = await this.responsibleRepository.findBy({
      companyId,
    });

    if (!checkResponsible) throw new AppError("Responsible not exists");

    return checkResponsible;
  }

  async create(companyId: string, createToResponsible: ResponsibleCreateInDTO) {
    const checkCompanyId = await this.responsibleRepository.findBy({
      companyId: companyId,
    });

    if (!checkCompanyId) {
      const data = new Date(createToResponsible.date);
      const responsibleDTO = new ResponsibleCreateDTO();
      responsibleDTO.companyId = companyId;
      responsibleDTO.date = moment()
        .month(data.getMonth() - 1)
        .year(data.getFullYear())
        .startOf("month")
        .toDate();

      await this.responsibleRepository.store(responsibleDTO);
    }

    const balanceSheet = await this.balancesheetService.create(
      companyId,
      createToResponsible.balancesheet,
    );

    return balanceSheet;
  }

  async delete(_id: number) {
    const checkResponsible = await this.responsibleRepository.findById(_id);

    if (!checkResponsible) throw new AppError("Responsible not exists");

    this.responsibleRepository.destroy(checkResponsible);
  }
}
