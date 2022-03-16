import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { AttributeResolver } from './attribute.resolver';
import { PostAttribute } from './entities/post-attribute.entity';
import { PostAttributesResolver } from './post-attributes.resolver';
import { PostAttributesService } from './post-attributes.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostAttribute]), PostModule],
  providers: [PostAttributesResolver, PostAttributesService, AttributeResolver],
  exports:[PostAttributesService]
})
export class PostAttributesModule {}
