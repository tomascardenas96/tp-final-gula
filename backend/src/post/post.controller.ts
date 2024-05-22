import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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

  @Patch()
  recommendPost() {
    this.postService.recommendPost();
  }

  @Patch()
  unrecommendPost() {
    this.postService.unrecommendPost();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
