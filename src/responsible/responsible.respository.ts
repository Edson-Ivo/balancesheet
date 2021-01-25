import {Responsible} from "./responsible.entity";
import {DeepPartial, EntityRepository, Repository} from "typeorm";
import {QueryParams} from "src/shared/dto/queryParams.dto";
import {ResponsibleCreateDTO} from "./dto/create.dto";
import {AllowedRelation} from "./interface/allowRelations";

@EntityRepository(Responsible)
export class ResponsibleRepository extends Repository<Responsible> {
  async findAll(queryParams: QueryParams): Promise<Responsible[]> {
    const Responsible = this.find({
      take: queryParams.perPage,
      skip: queryParams.perPage * (queryParams.page - 1),
    });

    return Responsible;
  }

  findById(id: number): Promise<Responsible> {
    return this.findOne(id);
  }

  async findBy(paramToSearch) {
    return this.findOne({where: paramToSearch});
  }

  async findByRelations(
    paramToSearch,
    relations: AllowedRelation[],
  ) {
    return this.find({
      where: paramToSearch,
      relations,
    });
  }

  store(responsibleToCreate: ResponsibleCreateDTO) {
    return this.insert(responsibleToCreate);
  }

  async updateResponsible(Responsible: DeepPartial<any>) {
    return await this.update(Responsible.id, Responsible);
  }

  destroy(Responsible: Responsible) {
    this.remove(Responsible);
  }
}
