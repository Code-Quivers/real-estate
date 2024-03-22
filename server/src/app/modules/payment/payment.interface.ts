import { singlePackType } from '@prisma/client';

export type IPaymentFilterRequest = {
  searchTerm?: string | undefined;
};

export type IProductRequest = {
  productName: string;
  description?: string;
  shortSummery?: string;
  price: number;
  packType: singlePackType;
  subCategoryId: string;
  productImage: string;
};

export type IProductUpdateRequest = {
  productName?: string;
  description?: string;
  shortSummery?: string;
  price?: number;
  productVat?: number;
  packType?: singlePackType;
  subCategoryId?: string;
  productImage?: string;
  oldFilePath?: string;
};
