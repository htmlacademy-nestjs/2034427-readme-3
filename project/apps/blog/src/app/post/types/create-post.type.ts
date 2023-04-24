import {CreateVideoDto} from '../dto/create-video.dto';
import {CreatePhotoDto} from '../dto/create-photo.dto';
import {CreateTextDto} from '../dto/create-text.dto';
import {CreateQuoteDto} from '../dto/create-quote.dto';
import {CreateLinkDto} from '../dto/create-link.dto';

export type CreatePostType = CreateVideoDto | CreatePhotoDto | CreateTextDto | CreateQuoteDto | CreateLinkDto;
