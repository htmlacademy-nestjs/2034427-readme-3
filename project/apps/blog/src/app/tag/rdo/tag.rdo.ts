import {Expose} from 'class-transformer';

export class TagRdo {
  @Expose()
  public id: number;

  @Expose()
  public title: string;
}
