import Chance from 'chance';

export const chance = new Chance();

export const formatDate = (date: Date) => {
  const updatedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
  const updatedDay = ('0' + date.getDate()).slice(-2);
  const updatedDate = `${updatedMonth}-${updatedDay}-${date.getFullYear()}`;

  const updatedHours = ('0' + date.getHours()).slice(-2);
  const updatedMinutes = ('0' + date.getMinutes()).slice(-2);
  const updatedTime = `${updatedHours}:${updatedMinutes}`;

  return `${updatedDate} at ${updatedTime}`;
};

export const generateId = () => {
  return chance.guid({ version: 4 });
};

export const getNameInitials = (name: string) => {
  const names = name.split(' ');
  const firstInitial = names[0]?.[0].toUpperCase() || '';
  const lastInitial = names[names.length - 1]?.[0].toUpperCase() || '';

  return firstInitial + lastInitial;
};

export const getRandomElement = <T>(a: T[]) => {
  return a[Math.floor(Math.random() * a.length)];
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
