import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import {CustomSuccessResponse} from "src/shared/dto/customResponse.dto";
import {ResponsibleCreateInDTO} from "./dto/create-in.dto";
import {ResponsibleDTO} from "./dto/responsible.dto";
import {ResponsibleService} from "./responsible.service";

@Controller("responsible")
export class ResponsibleController {
  constructor(private responsibleService: ResponsibleService) {}
  @Get("read/company/:companyId")
  async readById(@Param() param) {
    const responsibleToCompany = await this.responsibleService.findByCompany(
      param.companyId,
    );

    return new ResponsibleDTO(
      responsibleToCompany._id,
      responsibleToCompany.companyId,
      responsibleToCompany.date,
      responsibleToCompany.balancesheet,
    );
  }

  @Post("import/:id")
  async import() {
    return "import all";
  }

  @Post("create/:companyId")
  async create(
    @Param() param,
    @Body(new ValidationPipe()) createResponsible: ResponsibleCreateInDTO,
  ) {
    const createdResponsible = await this.responsibleService.create(
      param.companyId,
      createResponsible,
    );

    return new ResponsibleDTO(
      createdResponsible._id,
      createdResponsible.companyId,
      createdResponsible.date,
      createdResponsible.balanceSheet,
    );
  }

  @Delete(":_id")
  async delete(@Param() param) {
    await this.responsibleService.delete(param._id);

    return new CustomSuccessResponse("Responsible removed");
  }
}
