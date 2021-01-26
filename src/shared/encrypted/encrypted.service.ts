import {Injectable} from "@nestjs/common";
import {genSaltSync, hashSync, compareSync} from "bcrypt";

@Injectable()
export class EncryptedService {
  async encrypt(data: string): Promise<any> {
    const salt = genSaltSync(6);
    const encrypted = hashSync(data, salt);
    return encrypted;
  }

  async compare(data: string, encrypted: string): Promise<any> {
    return compareSync(data, encrypted);
  }
}
