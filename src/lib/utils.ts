import Chance from 'chance';

export const chance = new Chance();

export const generateId = () => {
  return chance.guid({ version: 4 });
};

export const getRandomElement = <T>(a: T[]) => {
  return a[Math.floor(Math.random() * a.length)];
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
