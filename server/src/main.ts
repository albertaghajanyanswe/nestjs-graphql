import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./utils/interceptor/interceptor.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// process.env.TZ = "UTC";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix("v1");

  const config = new DocumentBuilder()
    .setTitle("Swagger API")
    .setDescription("Users Auth and other stuff")
    .setVersion("1.0.0")
    .addBearerAuth()
    .addTag("Users")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);

  console.log(`\n\nServer started on ${4000} port.\n\n`);
  await app.listen(4000);
}
bootstrap();
