import privateRequest from "../config/axios.config";

export const getCategoriesAction = async () =>
  privateRequest
    .get<{ data: Category[] }>("/admin/category/list")
    .then((res) => res.data.data);

export const deleteCategoryAction = async (id: string) =>
  privateRequest.delete(`/admin/category/delete/${id}`);

export const createCategoryAction = async (data: Category) =>
  privateRequest.post("/admin/category/create", data);

export const updateCategoryAction = async (data: Category, ID: string) =>
  privateRequest.put(`/admin/category/update/${ID}`, data);
