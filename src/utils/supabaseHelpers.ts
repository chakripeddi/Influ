
/**
 * Utility functions for handling Supabase data transformations
 */

/**
 * Converts date objects to ISO strings for Supabase storage
 * @param dateObject An object containing Date objects
 */
export const convertDatesToISOStrings = (dateObject: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  
  for (const key in dateObject) {
    if (dateObject[key] instanceof Date) {
      result[key] = dateObject[key].toISOString();
    } else if (dateObject[key] && typeof dateObject[key] === 'object' && !Array.isArray(dateObject[key])) {
      result[key] = convertDatesToISOStrings(dateObject[key]);
    } else {
      result[key] = dateObject[key];
    }
  }
  
  return result;
};

/**
 * Parses ISO strings back to Date objects
 * @param dateObject An object potentially containing ISO date strings
 */
export const convertISOStringsToDates = (dateObject: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
  
  for (const key in dateObject) {
    if (typeof dateObject[key] === 'string' && isoDatePattern.test(dateObject[key])) {
      result[key] = new Date(dateObject[key]);
    } else if (dateObject[key] && typeof dateObject[key] === 'object' && !Array.isArray(dateObject[key])) {
      result[key] = convertISOStringsToDates(dateObject[key]);
    } else {
      result[key] = dateObject[key];
    }
  }
  
  return result;
};
