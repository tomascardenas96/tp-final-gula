import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActiveUser } from '../common/decorator/active-user.decorator';
import { ActiveUserInterface } from '../common/interface/active-user.interface';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post(':name')
  newPost(
    @ActiveUser() user: ActiveUserInterface,
    @Body() newPost: CreatePostDto,
    @Param('name') shopName: string,
  ) {
    return this.postService.newPost(user, newPost, shopName);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('shop/:profilename')
  getPostsByShop(@Param('profilename') profilename: string) {
    return this.postService.getPostsByShop(profilename);
  }

  @Delete('delete/:postId')
  deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.postService.deletePost(postId, user);
  }
}
