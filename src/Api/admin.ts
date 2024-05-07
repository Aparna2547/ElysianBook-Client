import Api from "../Services/axios";
import AdminRoutes from "../Services/endpoints/adminEndpoints";
import errorHandle from "../Api/errorHandle";

export const login = async (email: string, password: string) => {
  try {
    const res = await Api.post(AdminRoutes.login, { email, password });
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const listUser = async (id: string) => {
  try {
    const res = await Api.put(`${AdminRoutes.listUser}?id=${id}`);

    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const addCategory = async (category: FormData) => {
  try {
    const res = await Api.post(AdminRoutes.addCategory, category);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const editCategory = async (id: string, formData: FormData) => {
  try {
    const res = await Api.put(`${AdminRoutes.editCategory}?id=${id}`, formData);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const allCategory = async (search: string, page: number) => {
  try {
    const res = await Api.get(
      `${AdminRoutes.allCategory}?search=${search}&page=${page}`
    );
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const hideCategory = async (id: string) => {
  try {
    const res = await Api.put(`${AdminRoutes.hideCategory}?id=${id}`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const addFacility = async (facility: string) => {
  try {
    const res = await Api.post(AdminRoutes.addFacility, { facility });
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const allParlours = async (search: string, page: number) => {
  try {
    const res = await Api.get(
      `${AdminRoutes.allParlours}?search=${search}&page=${page}`
    );
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const getParlourDetails = async (id: string) => {
  try {
    const res = await Api.get(`${AdminRoutes.singleParlour}?id=${id}`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const ParlourRequestConfirmation = async (value: string, id: string) => {
  try {
    const response = await Api.post(AdminRoutes.parlourRequestConfirmation, {
      value,
      id,
    });
    return response;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const totalDetails = async () => {
  try {
    const res = await Api.get(AdminRoutes.totalDetails);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const addBanners = async (banners: FormData) => {
  try {
    const res = await Api.post(AdminRoutes.addBanners, banners);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const getBanners = async () => {
  try {
    const res = await Api.get(AdminRoutes.getBanners);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const deleteBanner = async (banner: string) => {
  try {
    const res = await Api.put(`${AdminRoutes.deleteBanner}?banner=${banner}`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const monthlyProfit = async (year: string) => {
  try {
    const res = await Api.get(`${AdminRoutes.monthlyProfit}?year=${year}`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};
export const adminLogout = async () => {
  try {
    const res = await Api.post(AdminRoutes.adminLogout);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};
