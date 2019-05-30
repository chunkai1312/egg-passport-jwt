import 'egg';

declare module 'egg' {
  interface EggAppConfig {
    passportJwt: {
      secret: string;
    };
  }
}
