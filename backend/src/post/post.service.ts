import {
  BadRequestException,
  Injectable,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { ShopService } from '../shop/shop.service';
import { ActiveUserInterface } from '../common/interface/active-user.interface';
import { UserService } from '../user/user.service';
import { Shop } from 'src/shop/entities/shop.entity';
import { GulaSocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly shopService: ShopService,
    private readonly socketsGateway: GulaSocketGateway,
  ) {}

  //Esta funcion toma 3 parametros, user es para verificar que el usuario es propietario del comercio desde
  //el cual quiere realizar una publicacion, description es el cuerpo del mensaje donde viajara lo que quiere
  //publicar el usuario y shopName proveniente de la url, para identificar el nombre del comercio que va a realizar la operacion.
  async newPost(
    user: ActiveUserInterface,
    { description }: CreatePostDto,
    shopName: string,
  ): Promise<Post> {
    try {
      //Verificamos que exista el comercio.
      const shop: Shop = await this.shopService.getShopByName(shopName);
      if (!shop) {
        throw new NotFoundException(`Shop with name '${shopName}' not found`);
      }

      //Verificamos si quien esta haciendo la publicacion es propietario del comercio.
      const isUserOwner: boolean = shop.user.email === user.email;
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
      const post: Post = this.postRepository.create({
        description,
        shop,
      });

      //Enviar una notificacion de cambios en el array de post al frontend para que vuelva a renderizar el componente que los muestra.
      this.socketsGateway.sendNewPost(post);

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

  getAllPosts(): Promise<Post[]> {
    try {
      const posts = this.postRepository.find({ relations: ['shop'] });
      return posts;
    } catch (err) {
      throw new BadRequestException('Error trying to get publications');
    }
  }

  async getPostsByShop(profilename: string): Promise<Post[]> {
    try {
      const getShop: Shop =
        await this.shopService.getShopByProfileName(profilename);
      if (!getShop) {
        throw new NotFoundException(
          'Post service: invalid or inexistent shop - getPostsByShop method',
        );
      }

      return this.postRepository.find({ where: { shop: getShop } });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadGatewayException(
        'Post service: error getting posts by shop - getPostsByShop method',
      );
    }
  }
}
