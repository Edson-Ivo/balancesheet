import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {ResponsibleDTO} from "../dto/responsible.dto";
import {ResponsibleRepository} from "../responsible.respository";
import {ResponsibleService} from "../responsible.service";
import {BalancesheetRepository} from "./balancesheet.repository";
import {BalancesheetCreateDTO} from "./dto/create.dto";

@Injectable()
export class BalancesheetService {
  constructor(
    private balancesheetepository: BalancesheetRepository,

    @Inject(forwardRef(() => ResponsibleService))
    private responsibleService: ResponsibleService,
  ) {}

  async create(
    responsible: string,
    balancesheetToCreate: BalancesheetCreateDTO[],
  ) {
    const checkResponsible = await this.responsibleService.findByCompanyId(
      responsible,
    );

    const balanceCreateMap = await balancesheetToCreate.map(
      async balancesheet => {
        const balanceDTO = new BalancesheetCreateDTO();
        balanceDTO.classification = balancesheet.classification;
        balanceDTO.description = balancesheet.description;
        balanceDTO.description_nd = balancesheet.description_nd;

        balanceDTO.credit = balancesheet.credit;
        balanceDTO.debit = balancesheet.debit;
        balanceDTO.initialCash = balancesheet.initialCash;
        balanceDTO.finalCash = balancesheet.finalCash;
        balanceDTO.responsible = checkResponsible;

        await this.balancesheetepository.store(balanceDTO);
        return balanceDTO;
      },
    );

    const resolveBalanceCreate = await Promise.all(balanceCreateMap);

    resolveBalanceCreate.map(result => {
      delete result.responsible;
    });

    return new ResponsibleDTO(
      checkResponsible._id,
      checkResponsible.companyId,
      checkResponsible.date,
      resolveBalanceCreate,
    );
  }
}
