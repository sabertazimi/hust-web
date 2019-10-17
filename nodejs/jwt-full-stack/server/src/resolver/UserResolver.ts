import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
  UseMiddleware
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from '../entity/User';
import { AppContext } from '../AppContext';
import { createRefreshToken, createAccessToken } from '../auth';
import { isAuth } from '../middleware/isAuth';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: AppContext) {
    return `Your use id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword
      });
    } catch (err) {
      console.error(err.message);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: AppContext
  ) {
    const { res } = context;

    const user = await User.findOne({
      where: { email }
    });
    if (!user) {
      throw new Error('Could not find user');
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('Bad password');
    }

    // login success
    res.cookie('jid', createRefreshToken(user), { httpOnly: true });
    return { accessToken: createAccessToken(user) };
  }
}
