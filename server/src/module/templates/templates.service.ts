import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter, Pagination } from '@models';
import { Repository } from 'typeorm';
import { SaveTemplateDto } from './dto/save-template.dto';
import { Template } from './template.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  async save(data: SaveTemplateDto) {
    return await this.templatesRepository.save(data);
  }

  async get(filter: Filter): Promise<Pagination<Template>> {
    const { pageSize, pageIndex, search } = filter;
    const qb = await this.templatesRepository.createQueryBuilder('Template').where({ private: false });
    if (search) {
      qb.where(`(title LIKE "%${search}%" OR content LIKE "%${search}%")`);
    }
    if (pageSize != undefined) {
      qb.take(pageSize);
    }
    if (pageIndex != undefined && pageSize != undefined) {
      qb.skip(pageSize * pageIndex);
    }
    const [data, totalCount] = await qb.getManyAndCount();
    const result = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalCount: totalCount,
      data: data,
    };
    return result;
  }

  async getMy(userId: number, filter: Filter): Promise<Pagination<Template>> {
    const { pageSize, pageIndex, search } = filter;
    const qb = await this.templatesRepository.createQueryBuilder('Template').where({ userId: userId });
    if (search) {
      qb.where(`(title LIKE "%${search}%" OR content LIKE "%${search}%")`);
    }
    if (pageSize != undefined) {
      qb.take(pageSize);
    }
    if (pageIndex != undefined && pageSize != undefined) {
      qb.skip(pageSize * pageIndex);
    }
    const [data, totalCount] = await qb.getManyAndCount();
    const result = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalCount: totalCount,
      data: data,
    };
    return result;
  }

  async read(id: number) {
    return await this.templatesRepository.findOne({ where: { id: id } });
  }
}
