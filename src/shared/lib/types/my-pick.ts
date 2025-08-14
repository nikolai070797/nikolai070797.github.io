
/**
 * Создает тип, выбирая только указанные свойства из объекта T
 * @template T - Исходный объектный тип
 * @template K - Ключи, которые нужно выбрать из T
 * @example
 * ```typescript
 * type User = { id: number; name: string; email: string };
 * type UserBase = MyPick<User, 'id' | 'name'>; 
 * // { id: number; name: string }
 * ```
 */
export type MyPick<T extends object, K extends keyof T> = {
  [P in K]: T[P];
};

