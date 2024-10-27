import { Injectable } from '@nestjs/common'
import { Comment } from './models/comment.model'
import { NewCommentInput } from './dto/new-comment.input'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CommentDto } from './dto/comment.dto'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment)
		private readonly comment: ModelType<Comment>,
	) {}
	async create(data: NewCommentInput): Promise<Comment> {
		const dto: CommentDto = {
			comId: (Math.random() * 100000).toFixed(),
			user: data.user,
			title: 'chat',
			comment: data.comment,
		}
		const newComment = new this.comment(dto)

		return newComment.save()
	}

	async findOneById(comId: string): Promise<Comment> {
		const commOne = await this.comment.findOne({ comId }).exec()
		console.log(commOne)
		if (!commOne) {
			throw new Error(`${comId} comment not found`)
		}
		return commOne
	}

	async findAll(title: string): Promise<Comment[]> {
		const commAll = await this.comment.find({ title }).exec()
		if (!commAll) {
			throw new Error(`error get all comment`)
		}

		const date = new Date()
		if (commAll.length > 100) {
			commAll.forEach(async (i) => {
				if (+date - +i.createdAt > 7200000) {
					const comId = i.comId
					await this.comment.findOneAndDelete({ comId }).exec()
				} else {
					return
				}
			})
		}
		return commAll
	}

	async remove(comId: string): Promise<boolean> {
		const del = await this.comment.findOneAndDelete({ comId }).exec()
		if (!del) {
			throw new Error(`${comId} comment not found`)
		} else {
			return true
		}
	}
}
