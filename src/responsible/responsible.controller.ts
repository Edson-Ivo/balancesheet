import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {CustomSuccessResponse} from "src/shared/dto/customResponse.dto";
import {editFileName} from "src/shared/upload/utils/upload-files";
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

  @Post("import/:companyId")
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(txt)$/)) {
          req.fileErrors = {
            error: true,
          };
          return cb(null, false);
        }
        return cb(null, true);
      },
      storage: diskStorage({
        destination: "./upload",
        filename: editFileName,
      }),
    }),
  )
  async import(@Param() param, @UploadedFile() file) {
    const createToImportFile = await this.responsibleService.import(
      param.companyId,
      file,
    );

    return createToImportFile;
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
