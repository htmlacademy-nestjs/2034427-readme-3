import { Types } from 'mongoose';
import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

const BAD_MONGOID_ERROR = 'Bad entity ID';
const PIPE_USE_ONLY_PARAM = 'This pipe must used only with params!';

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, {type}: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(PIPE_USE_ONLY_PARAM);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
