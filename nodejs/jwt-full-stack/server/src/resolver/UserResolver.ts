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
import {
  createRefreshToken,
  createAccessToken,
  sendRefreshToken
} from '../auth';
import { isAuth } from '../middleware/isAuth';
import { getConnection } from 'typeorm';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

/**
 * Revoke valid tokens
 * @param userId user ID to revoken tokens
 */
export const revokeRefreshTokensForUser = async (userId: number) => {
  try {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);
  } catch (err) {
    console.error(`[error] ${err.name}: ${err.message}`);
    return false;
  }

  return true;
};

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hello JWT';
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  user(@Ctx() { payload }: AppContext) {
    return User.findOne(payload!.userId);
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
      const user = await User.findOne({
        where: { email }
      });
      if (user) {
        throw new Error('User already existed.');
      }

      await User.insert({
        email,
        password: hashedPassword
      });
    } catch (err) {
      console.error(`[error] ${err.name}: ${err.message}`);
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

    try {
      const user = await User.findOne({
        where: { email }
      });
      if (!user) {
        throw new Error('Non-existent user or wrong password');
      }

      const valid = await compare(password, user.password);
      if (!valid) {
        throw new Error('Non-existent user or wrong password');
      }

      // login success
      sendRefreshToken(res, createRefreshToken(user));
      return { accessToken: createAccessToken(user), user };
    } catch (err) {
      console.error(`[error] ${err.name}: ${err.message}`);
      return { accessToken: '', user: null };
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: AppContext) {
    sendRefreshToken(res, '');
    return true;
  }
}
