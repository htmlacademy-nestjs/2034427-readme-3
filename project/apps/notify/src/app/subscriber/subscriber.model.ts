import {Document} from 'mongoose';
import {ISubscriber} from '@project/shared/app-types';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

const SUBSCRIBERS_COLLECTION_NAME = 'notify-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME
})
export class SubscriberModel extends Document implements ISubscriber {
  @Prop()
  email: string;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
