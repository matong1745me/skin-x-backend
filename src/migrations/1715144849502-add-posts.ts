import { MigrationInterface, QueryRunner } from "typeorm";
import * as postData from '@/database/data/posts.json';

export class AddPosts1715144849502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('post')
      .values(postData)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
