import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ResponsibleController} from "./responsible.controller";
import {ResponsibleRepository} from "./responsible.respository";
import {ResponsibleService} from "./responsible.service";

@Module({
  imports: [TypeOrmModule.forFeature([ResponsibleRepository])],
  controllers: [ResponsibleController],
  providers: [ResponsibleService],
})
export class ResponsibleModule {}
