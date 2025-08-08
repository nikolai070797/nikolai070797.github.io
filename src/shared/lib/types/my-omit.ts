
/**
 * Создает тип, исключая указанные свойства из объекта T
 * @template T - Исходный объектный тип
 * @template K - Ключи, которые нужно исключить из T
 * @example
 * ```typescript
 * type User = { id: number; name: string; email: string };
 * type UserWithoutId = MyOmit<User, 'id'>; 
 * // { name: string; email: string }
 * ```
 */
export type MyOmit<Obj extends object, Keys extends keyof Obj> = Pick<Obj, Exclude<keyof Obj, Keys>>;