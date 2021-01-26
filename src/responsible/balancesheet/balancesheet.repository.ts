import {Balancesheet} from "./balancesheet.entity";
import {DeepPartial, EntityRepository, Repository} from "typeorm";
import {QueryParams} from "src/shared/dto/queryParams.dto";
import {BalancesheetCreateDTO} from "./dto/create.dto";

@EntityRepository(Balancesheet)
export class BalancesheetRepository extends Repository<Balancesheet> {
  async findAll(queryParams: QueryParams): Promise<Balancesheet[]> {
    const Balancesheet = this.find({
      take: queryParams.perPage,
      skip: queryParams.perPage * (queryParams.page - 1),
    });

    return Balancesheet;
  }

  findById(id: number): Promise<Balancesheet> {
    return this.findOne(id);
  }

  async findBy(paramToSearch) {
    return this.findOne({where: paramToSearch});
  }

  async store(balancesheetToCreate: BalancesheetCreateDTO) {
    return await this.insert(balancesheetToCreate);
  }

  async updateBalancesheet(Balancesheet: DeepPartial<any>) {
    return await this.update(Balancesheet.id, Balancesheet);
  }

  destroy(Balancesheet: Balancesheet) {
    this.remove(Balancesheet);
  }
}
