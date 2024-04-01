import { Module, Controller } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { userSchema, User, UserModel } from './user.schema';
import { DatabaseConnection } from 'src/db';


@Module({
  imports: [
    MongooseModule.forFeature([{name: "User", schema: userSchema}]),
    MongooseModule.forRootAsync({
      useClass: DatabaseConnection,
    }),
  
  ],
    
    controllers: [UserController],
    providers: [UserService,DatabaseConnection],
    exports: [UserService]
})
export class UserModule {
    
}


