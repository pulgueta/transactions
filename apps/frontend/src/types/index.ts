export type Product = {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly stock: number;
  readonly description: string;
  readonly price: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};
