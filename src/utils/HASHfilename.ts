export const encodeKey = (key: string): string => key.replace(/\./g, "~");
export const decodeKey = (key: string): string => key.replace(/~/g, ".");
