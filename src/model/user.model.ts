// user.model.ts
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document  } from 'mongoose';


@Schema()
export class User {
  _id: any;
  comparePassword(password: string):boolean {
      throw new Error('Method not implemented.');
  }
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;
}




export const UserSchema = SchemaFactory.createForClass(User);

type UserDocument = User & Document<any, any, any>;

export { UserDocument };

