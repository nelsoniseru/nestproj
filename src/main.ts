import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as csurf from 'csurf';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { errorHandler } from './middleware/error';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Core Service');

  app.use(errorHandler);
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());

  const localhost = new RegExp('^https?://localhost*(:[0-9]+)?(/.*)?$');
  //const domain = new RegExp('https?://([a-z0-9]+[.])*joysticklabs[.]io');

  app.enableCors({
    credentials: true,
    origin: [localhost],
    optionsSuccessStatus: 200,
  });

  await app.listen(process.env.PORT || 5000);

  app.use(csurf());
  app.use(helmet());
  app.use(helmet.xssFilter());
  logger.debug(`Core service running on: ${await app.getUrl()}`);
}
bootstrap();
