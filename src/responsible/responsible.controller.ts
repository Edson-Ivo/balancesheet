import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from "@nestjs/common";
import {ResponsibleCreateInDTO} from "./dto/create-in.dto";
import {ResponsibleCreateDTO} from "./dto/create.dto";
import {ResponsibleService} from "./responsible.service";

@Controller("responsible")
export class ResponsibleController {
  constructor(private responsibleService: ResponsibleService) {}
  @Get("read/all")
  async readAll() {
    return "read all";
  }

  @Get("read/id/:id")
  async readById() {
    return "read by id";
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
    return createdResponsible;
  }

  @Put()
  async update() {
    return "update";
  }

  @Delete()
  async delete() {
    return "delete";
  }
}
