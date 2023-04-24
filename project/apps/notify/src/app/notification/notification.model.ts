import {Document} from 'mongoose';
import {PostType} from '@prisma/client';
import {INotifyPost} from '@project/shared/app-types';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

const NOTIFY_COLLECTION_NAME = 'notify-posts';

@Schema({
  collection: NOTIFY_COLLECTION_NAME
})
export class NotificationModel extends Document implements INotifyPost {
  @Prop()
  postId: number;
  @Prop({type: String, enum: PostType})
  postType: PostType;
  @Prop()
  title: string;
  @Prop()
  userId: string;
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationModel);
