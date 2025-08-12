export type CategoryParams = {
  name: string;
  photo?: string;
};

// Патч для частичного обновления категории
export type CategoryPatch = {
  name?: string;
  photo?: string;
};