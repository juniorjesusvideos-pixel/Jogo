import config from '@colyseus/tools';
import type { Request, Response } from 'express';
import express from 'express';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { TownRoom } from './rooms/TownRoom';
import { handleListCharacters } from './db/character-api';

export default config({
  options: {
    devMode: process.env['NODE_ENV'] !== 'production',
  },
  initializeGameServer: (gameServer) => {
    gameServer.define('town', TownRoom).filterBy(['instanceKey']);
  },
  initializeExpress: (app) => {
    app.get('/health', (_req: Request, res: Response) => {
      res.status(200).send('ok');
    });
    app.get('/api/characters', handleListCharacters);

    if (process.env['NODE_ENV'] === 'production') {
      const clientDir = resolve(process.cwd(), 'dist/client');
      if (existsSync(clientDir)) {
        app.use(express.static(clientDir));
        app.get('/', (_req: Request, res: Response) => res.sendFile(resolve(clientDir, 'index.html')));
      }
    }
  },
});
