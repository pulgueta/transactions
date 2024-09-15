import { randBetweenDate, randNumber, randProduct } from '@ngneat/falso';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn('Error While generating Seed: \n', err);
});
