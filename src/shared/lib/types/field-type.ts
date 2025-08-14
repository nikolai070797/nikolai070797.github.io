/**
 * Получает тип значения конкретного поля из объектного типа
 * 
 * Используется для извлечения типа отдельного свойства объекта,
 * что полезно при создании типизированных API функций и валидаций
 * 
 * @template T - Исходный объектный тип
 * @template K - Ключ свойства, тип которого нужно получить
 * 
 * @example
 * ```typescript
 * type User = {
 *   id: number;
 *   name: string;
 *   isActive: boolean;
 * };
 * 
 * // Получаем типы отдельных полей
 * type UserId = FieldType<User, 'id'>;        // number
 * type UserName = FieldType<User, 'name'>;    // string
 * type UserActive = FieldType<User, 'isActive'>; // boolean
 * 
 * // Использование в API функциях
 * const getUserById = async (id: FieldType<User, 'id'>): Promise<User> => {
 *   // id имеет тип number
 *   const response = await fetch(`/api/users/${id}`);
 *   return response.json();
 * };
 * 
 * // Использование в валидациях
 * const validateUserId = (id: FieldType<User, 'id'>): boolean => {
 *   return typeof id === 'number' && id > 0;
 * };
 * ```
 * 
 * @see {@link ValueOf} - альтернативное название для той же утилиты
 * @see {@link GetField} - аналогичная утилита для получения типа поля
 */
export type FieldType<T, K extends keyof T> = T[K];