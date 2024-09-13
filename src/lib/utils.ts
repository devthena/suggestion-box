import Chance from 'chance';

// Instance of Chance used for generating random values
export const chance = new Chance();

/**
 * Converts a given date into the format MM-DD-YYYY at HH:MM
 *
 * @param date - The date object to be formatted
 * @returns A formatted string in the format MM-DD-YYYY at HH:MM
 */
export const formatDate = (date: Date) => {
  const updatedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
  const updatedDay = ('0' + date.getDate()).slice(-2);
  const updatedDate = `${updatedMonth}-${updatedDay}-${date.getFullYear()}`;

  const updatedHours = ('0' + date.getHours()).slice(-2);
  const updatedMinutes = ('0' + date.getMinutes()).slice(-2);
  const updatedTime = `${updatedHours}:${updatedMinutes}`;

  return `${updatedDate} at ${updatedTime}`;
};

/**
 * Generates a random version 4 GUID
 * @returns A random GUID string
 */
export const generateId = () => {
  return chance.guid({ version: 4 });
};

/**
 * Gets the initials from a given full name
 *
 * @param name - The full name of a person
 * @returns A string containing the initials of the name (first and last name initials)
 */
export const getNameInitials = (name: string) => {
  const names = name.split(' ');
  const firstInitial = names[0]?.[0].toUpperCase() || '';
  const lastInitial = names[names.length - 1]?.[0].toUpperCase() || '';

  return firstInitial + lastInitial;
};

/**
 * Gets a random element from an array
 *
 * @param a - An array of elements
 * @returns A randomly selected element from the array
 */
export const getRandomElement = <T>(a: T[]) => {
  return a[Math.floor(Math.random() * a.length)];
};

/**
 * Returns a random integer between a given minimum and maximum value (inclusive)
 *
 * @param min - The minimum value of the random number
 * @param max - The maximum value of the random number
 * @returns A random integer between min and max
 */
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
