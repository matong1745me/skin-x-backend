// db.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default dbConfig;
