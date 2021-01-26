import {join} from "path";
import {promises as fs} from "fs";
import {Injectable} from "@nestjs/common";
import {FileIsNotExists} from "./exception/FileIsNotExists";

@Injectable()
export class UploadFilesService {
  async delete(path, filename) {
    const filePath = join(path, filename);
    const fileExists = await fs.stat(filePath);

    if (!fileExists) {
      throw new FileIsNotExists();
    }

    await fs.unlink(filePath);
  }
}
