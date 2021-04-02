import {Module, CacheModule, NestModule,MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommentEntity} from 'src/entity/comment.entity';
import {OptionsEntity} from 'src/entity/options.entity';
import {ArticleEntity} from 'src/entity/article.entity';
import {KeywordsFileEntity} from 'src/entity/keywordsFile.entity';
import {LocationModule} from 'src/modules/location/location.module';

// 配置黑名单依赖
import { BlacklistMiddleware } from 'src/middleware/blacklist.middleware';
import { BlacklistEntity } from 'src/entity/blacklist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, OptionsEntity, ArticleEntity, BlacklistEntity, KeywordsFileEntity]),
    LocationModule,
    CacheModule.register()
  ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(BlacklistMiddleware).forRoutes(
      { path: 'comment/list', method: RequestMethod.GET }
    );
  }
}