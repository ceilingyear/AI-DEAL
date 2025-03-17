interface FormatError {
  code: number;
  message: string;
  data: Record<string, any> | null;
  originalError?: Error;
}

declare module 'crypto-js/sha256';
declare module 'crypto-js/enc-base64'
declare module 'newsapi';