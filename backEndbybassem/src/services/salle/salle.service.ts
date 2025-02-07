import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { salle } from '../../entities/salle.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { TypeSalle } from '../../entities/enums/type-salle.enum';

@Injectable()
export class SalleService {
  constructor(
    @InjectRepository(salle)
    private readonly salleRepository: Repository<salle>,
  ) {}

  async getSalles(options: { page: number; limit: number }): Promise<Pagination<salle>> {
    return paginate<salle>(this.salleRepository, options);
  }

  async getSalleById(id: number): Promise<salle> {
    const salle = await this.salleRepository.findOne({ where: { id } });
    if (!salle) {
      throw new NotFoundException(`Salle with ID ${id} not found`);
    }
    return salle;
  }

  async addSalle(salle: salle): Promise<salle> {
    return this.salleRepository.save(salle);
  }

  async updateSalle(id: number, updatedSalle: salle): Promise<salle> {
    try {
      await this.salleRepository.findOneOrFail({ where: { id } });
      await this.salleRepository.update(id, updatedSalle);
      return this.salleRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Salle with ID ${id} not found`);
    }
  }

  async deleteSalle(id: number): Promise<string> {
    await this.salleRepository.delete(id);
    return `Salle with ID ${id} deleted successfully`;
  }

  async searchSalles(typeSalle: TypeSalle, options: { page: number; limit: number }): Promise<Pagination<salle>> {
    const queryBuilder = this.salleRepository.createQueryBuilder('salle');
    queryBuilder.where('salle.typeSalle = :typeSalle', { typeSalle });
    return paginate<salle>(queryBuilder, options);
  }
}