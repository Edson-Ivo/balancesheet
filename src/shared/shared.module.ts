import {ValidationPipe} from "./pipes/validation.pipe";
import {Module} from "@nestjs/common";
import {EncryptedService} from "./encrypted/encrypted.service";
import {UploadFilesService} from "./upload/upload-files.service";
@Module({
  providers: [
    ValidationPipe,
    EncryptedService,
    UploadFilesService,
  ],
  exports: [ValidationPipe, EncryptedService,],
  imports: [EncryptedService],
})
export class SharedModule {}
