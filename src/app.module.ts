import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from './config/mongo-config'
import { CommentModule } from './comment/comment.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'
import { UserInOutModule } from './userInOut/userInOut.module'
@Module({
	imports: [
		CommentModule,
		UserInOutModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,

			autoSchemaFile: 'schema.gql',
			transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
			playground: true,
			subscriptions: {
				'graphql-ws': true,
				'subscriptions-transport-ws': true,
			},
			buildSchemaOptions: {
				directives: [
					new GraphQLDirective({
						name: 'upper',
						locations: [DirectiveLocation.FIELD_DEFINITION],
					}),
				],
			},
		}),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
	],
})
export class AppModule {}
