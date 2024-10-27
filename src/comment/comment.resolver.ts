import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Comment } from './models/comment.model'
import { NewCommentInput } from './dto/new-comment.input'
import { CommentService } from './comment.service'

const pubSub = new PubSub()

@Resolver(() => Comment)
export class CommentResolver {
	constructor(private readonly commentService: CommentService) {}

	@Query(() => Comment)
	async comment(@Args('comId') comId: string): Promise<Comment> {
		const comment = await this.commentService.findOneById(comId)
		if (!comment) {
			throw new NotFoundException(comId)
		}
		return comment
	}

	@Query(() => [Comment])
	allComments(): Promise<Comment[]> {
		return this.commentService.findAll('chat')
	}

	@Mutation(() => Comment)
	async addComment(
		@Args('newCommentData') newCommentData: NewCommentInput,
	): Promise<Comment> {
		const comment = await this.commentService.create(newCommentData)

		const allComment = await this.commentService.findAll('chat')

		pubSub.publish('commentAdded', { commentAdded: allComment })
		return comment
	}

	@Mutation(() => Boolean)
	async deleteComment(@Args('comId') comId: string): Promise<boolean> {
		const chek = await this.commentService.remove(comId)
		const allComment = await this.commentService.findAll('chat')
		pubSub.publish('commentAdded', { commentAdded: allComment })
		return chek
	}

	@Subscription(() => [Comment])
	commentAdded(): AsyncIterator<unknown, any, any> {
		return pubSub.asyncIterator('commentAdded')
	}
}
