import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as yup from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: yup.AnySchema) { }

  async transform(value: any) {
    try {
      return await this.schema.validate(value, { abortEarly: false, stripUnknown: true });
    } catch (err: any) {
      throw new BadRequestException(err.errors || 'Validation failed');
    }
  }
}
