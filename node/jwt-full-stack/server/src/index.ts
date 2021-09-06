import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import cors from 'cors';
import { UserResolver } from './resolver/UserResolver';
import { User } from './entity/User';
import {
  createRefreshToken,
  createAccessToken,
  sendRefreshToken,
} from './auth';

const SERVER_PORT = process.env.PORT || 4000;

(async () => {
  const app = express();
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(cookieParser());
  app.use(
    rateLimit({
      windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
      max: 5,
      message: 'You exceeded 100 requests in 12 hour limit!',
      headers: true,
    })
  );
  app.get('/', (_req, res) => res.send('Hello JWT'));
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.error(`[error] ${err.name}: ${err.message}`);
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(`Express server started on port ${SERVER_PORT}`);
  });
})();
