import { Global, Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentResolver } from './comment.resolver'
import { DateScalar } from 'src/common/scalars/date.scalar'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { Comment } from './models/comment.model'

@Global()
@Module({
	providers: [CommentResolver, CommentService, DateScalar],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: Comment,
				schemaOptions: {
					collection: 'chat',
				},
			},
		]),
		ConfigModule,
	],
	exports: [CommentService],
})
export class CommentModule {}
