"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const interceptor_service_1 = require("./utils/interceptor/interceptor.service");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new interceptor_service_1.LoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Swagger API")
        .setDescription("Users Auth and other stuff")
        .setVersion("1.0.0")
        .addBearerAuth()
        .addTag("Users")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("doc", app, document);
    console.log(`\n\nServer started on ${4000} port.\n\n`);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map