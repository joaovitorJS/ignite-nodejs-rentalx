import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

// padrão de projeto singleton

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    /* Cria a entidade para ser salva */
    const category = this.repository.create({
      description,
      name,
    });

    /* Salvando a entidade criada */
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    /* Busca todas as entidades dentro do repositório */
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    /* 
    Busca uma entidade pelo nome 
    `select * from categorie where name = "name" limit 1`
    */
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
