import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LanguagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const languages = await this.prisma.language.findMany({
      where: {
        isActive: true,
      },
    });
    if (!languages.length) throw new NotFoundException('No languages found');
    return languages;
  }
}
