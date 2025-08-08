export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_URL_SERVER_HTTPS ?? 'https://19429ba06ff2.vps.myjino.ru/api',
  TIMEOUT: 10_000,
  COMMANDID: 'nikolai070797',
} as const;
