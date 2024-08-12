import { ICategoryFilterRequest } from './../../server/src/app/modules/category/category.interface';
export interface IMeta {
    limit: number;
    page: number;
    total: number;
}

export type ResponseSuccessType = {
    data: any;
    message: string;
    success: boolean;
    status: number;
    meta?: IMeta;
};

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

export interface IUser {
    firstName: string;
}

export type IDashboardLogin = {
    email: string;
    password: string;
};

export type ICreateUser = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    userType: string;
};

export type IUpdateUser = {
    email?: string;
    password?: string;
    role?: string;
    userStatus?: string;
    firstName?: string;
    lastName?: string;
};

export type ICreateCategory = {
    categoryName: string;
    categoryImg: string;
};
export type IUpdateCategory = {
    categoryName?: string;
    categoryImg?: string;
};

export type ICreateSubCategory = {
    subCategoryName: string;
    categoryId: string;
    subCategoryImg: string;
};

export type IAssignUserWithCategory = {
    userId: string;
    categoryId: string[];
};

export type singleCategoryType = {
    categoryName: string;
};

export type IUpdateSubCategory = {
    subCategoryName?: string;
    categoryId?: string;
    subCategoryImg?: string;
};

export type ICreateProduct = {
    productName: string;
    productPrice: number;
    productImage: string;
    subCategoryId: string;
};
