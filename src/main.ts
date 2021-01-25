import {ValidationPipe} from "./shared/pipes/validation.pipe";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {NestExpressApplication} from "@nestjs/platform-express";
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import * as dotenv from "dotenv";
import {ErrorsInterceptor} from "./shared/error/Errors.interceptor";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  });

  app.useGlobalInterceptors(new ErrorsInterceptor());

  const options = new DocumentBuilder()
    .setTitle("Teste - Balancete | 0.1.0")
    .setDescription("O processo de CRUD e bem simples, o CRUD se trata da manipulação de um arquivo chamado balancete que se trata de um string, passada para um método que vai ser chamar import() o método import deve receber    ")
    .setVersion("0.0.1")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
