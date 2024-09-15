export interface HashingService {
  hash(plain: string): Promise<string>;
  verify(hashed: string, plain: string): Promise<boolean>;
}
