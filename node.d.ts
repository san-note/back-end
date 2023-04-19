declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }
  interface ProcessEnv {
    /** node environment */
    NODE_ENV: string;
    KAKAO_REST_API_KEY: string;
    KAKAO_LOGIN_SECRET_KEY: string;
    LOGIN_SECRET_KEY: string;
  }
}
