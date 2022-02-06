import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  CreateTableCommand,
  PutItemCommand,
  PutItemCommandInput,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamoDbService {
  private client = new DynamoDBClient({ region: 'eu-central-1' });

  createTable(input: CreateTableCommandInput) {
    const command = new CreateTableCommand(input);
    return this.client.send(command);
  }

  putItem(input: PutItemCommandInput) {
    const command = new PutItemCommand(input);
    return this.client.send(command);
  }
}
