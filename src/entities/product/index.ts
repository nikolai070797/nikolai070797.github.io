export type { Product, ProductPatch } from "./model/Product"
export type { ProductPreview } from "./model/ProductPreview"
export type { ProductFilters } from "./model/ProductFilters"
export type { ProductParams } from "./model/ProductParams"
export type { ProductsResult } from "./model/ProductsResult"
export { ProductType } from "./model/ProductType"

export { ProductForm, type ProductFormProps } from "./ui/ProductForm/ProductForm"

export * from './ui/preview-full/PreviewFull'
export * from './ui/preview-mini/PreviewMini'

// // Пример использования
// const product: Product = {
//   id: '1',
//   title: 'Смартфон X',
//   description: 'Новейший смартфон с AMOLED экраном',
//   price: 699.99,
//   category: 'electronics',
//   subcategory: 'smartphones',
//   images: ['/images/phone1.jpg', '/images/phone2.jpg'],
//   specifications: {
//     'Диагональ экрана': '6.5 дюймов',
//     'Оперативная память': '8 ГБ',
//     'Встроенная память': '128 ГБ',
//   },
//   inStock: true,
//   rating: 4.7,
//   reviewsCount: 150,
//   discount: 10,
//   createdAt: '2023-09-20T14:30:00Z',
//   updatedAt: '2023-09-25T08:15:00Z',
//   seller: 'ElectroShop',
//   tags: ['new', 'bestseller'],
//   slug: 'smartphone-x-128gb',
// };
