export type IItemFilterRequest = {
  searchTerm?: string | undefined;
  itemName?: string | undefined;
};
export type IItemCreateRequest = {
  itemName: string;
};

export type IItemUpdateRequest = {
  itemName?: string;
};

export type IGetAllItemNames = {
  itemId: string;
  itemName: string;
};
