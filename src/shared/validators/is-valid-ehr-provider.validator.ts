import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidEhrProviderConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(code: string) {
    const provider = await this.prisma.ehrProvider.findUnique({
      where: { code, isActive: true },
    });
    return !!provider;
  }

  defaultMessage() {
    return 'EHR Provider not valid or inactive';
  }
}
