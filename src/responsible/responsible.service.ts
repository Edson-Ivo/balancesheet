import {forwardRef, Inject, Injectable} from "@nestjs/common";
import * as moment from "moment";
import {readFileSync} from "fs";
import {AppError} from "src/shared/error/AppError";
import {BalancesheetService} from "./balancesheet/balancesheet.service";
import {ResponsibleCreateInDTO} from "./dto/create-in.dto";
import {ResponsibleCreateDTO} from "./dto/create.dto";
import {ResponsibleNotWithRelationsDTO} from "./dto/responsibleNotRelations.dto";
import {ResponsibleRepository} from "./responsible.respository";
import {BalancesheetCreateDTO} from "./balancesheet/dto/create.dto";
import {v4 as uuidv4} from "uuid";
import {UploadFilesService} from "src/shared/upload/upload-files.service";

@Injectable()
export class ResponsibleService {
  constructor(
    private responsibleRepository: ResponsibleRepository,

    @Inject(forwardRef(() => BalancesheetService))
    private balancesheetService: BalancesheetService,
    private uploadFilesService: UploadFilesService /* UploadFilesService */,
  ) {}

  async import(companyId: string, file) {
    const data = readFileSync("./upload/" + file.filename, {
      encoding: "utf8",
      flag: "r",
    });

    const row = data.split(/\r?\n/);
    const fileToCreate = await row.map(async rows => {
      const rowMap = rows.split("\t");

      const balanceDTO = new BalancesheetCreateDTO();
      balanceDTO.classification = rowMap[0];
      balanceDTO.description = rowMap[1];
      balanceDTO.description_nd = rowMap[1];
      balanceDTO.credit = parseFloat(rowMap[2].split(" ")[0]);
      balanceDTO.debit = parseFloat(rowMap[3]);
      balanceDTO.initialCash = parseFloat(rowMap[4]);
      balanceDTO.finalCash = parseFloat(rowMap[5].split(" ")[0]);

      return balanceDTO;
    });

    await this.uploadFilesService.delete("./upload/", file.filename);

    const fileToCreateResolve = await Promise.all(fileToCreate);

    const createImport = await this.create(companyId, {
      _id: uuidv4(),
      date: new Date(),
      balancesheet: fileToCreateResolve,
    });

    return createImport;
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
