import { DynamoDbService } from '@app/dynamo-db';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { v4 } from 'uuid';
import { GetBookByOwnerDto } from './dto/get-by-owner.dto';

@Controller('/books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly dynamoDbService: DynamoDbService,
  ) {}

  @Post()
  addBook(@Body() body: CreateBookDto) {
    const bookId = v4();
    const {
      title,
      coverPicUrl,
      author,
      language,
      description,
      pageCount,
      ISBN10,
    } = body;

    const params = {
      TableName: 'Main',
      Item: {
        PK: { S: 'USER#user@user.com' },
        SK: { S: `ISBN#${body.ISBN10}ID#${bookId}` },
        title: { S: title },
        coverPicUrl: { S: coverPicUrl },
        author: { S: author },
        language: { S: language },
        description: {
          S: description,
        },
        pageCount: {
          N: pageCount.toString(),
        },
        ISBN10: {
          S: ISBN10,
        },
        updateAt: {
          S: new Date().toISOString(),
        },
      },
    };
    return this.dynamoDbService.putItem(params);
  }
  @Get('/:email')
  getBooksByOwner(@Param() param: GetBookByOwnerDto): string {
    return this.booksService.getHello();
  }
}
