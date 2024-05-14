import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { ShopService } from 'src/shop/shop.service';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly shopService: ShopService,
  ) {}

  //Esta funcion toma 3 parametros, user es para verificar que el usuario es propietario del comercio desde
  //el cual quiere realizar una publicacion, description es el cuerpo del mensaje donde viajara lo que quiere 
  //publicar el usuario y shopName proveniente de la url, para identificar el nombre del comercio que va a realizar la operacion.
  async newPost(
    user: ActiveUserInterface,
    { description }: CreatePostDto,
    shopName: string,
  ) {
    try {
      //Verificamos que exista el comercio.
      const shop = await this.shopService.getShopByName(shopName);
      if (!shop) {
        throw new NotFoundException(`Shop with name '${shopName}' not found`);
      }

      //Verificamos si quien esta haciendo la publicacion es propietario del comercio.
      const isUserOwner = shop.user.email === user.email;
      if (!isUserOwner) {
        throw new BadRequestException(
          'Only shop owner is able to create new post',
        );
      }

      // Validar la descripción del mensaje
      if (
        !description ||
        typeof description !== 'string' ||
        description.trim() === ''
      ) {
        throw new BadRequestException(
          'Description is required and must be a non-empty string',
        );
      }

      //Creamos el post y lo guardamos, luego lo retornamos.
      const post = this.postRepository.create({
        description,
        shop,
      });
      return this.postRepository.save(post);
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }
      throw new BadRequestException('Failed to create a new post', err.message);
    }
  }

  getAllPosts() {
    try {
      return this.postRepository.find({ relations: ['shop'] });
    } catch (err) {
      throw new BadRequestException('Error trying to get publications');
    }
  }

  recommendPost() {}

  unrecommendPost() {}

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
