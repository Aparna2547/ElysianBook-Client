import User from "../Pages/Admin/User/User";
import Api from "../Services/axios";
import UserRoutes from "../Services/endpoints/userEndpoints";
import errorHandle from "../Api/errorHandle";


interface Services{
  serviceName:string,
  price:number,
  duration:number
}

export const signup = async (name: string, email: string, password: string) => {
  try {
    const res = Api.post(UserRoutes.signup, { name, email, password });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const gsignup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await Api.post(UserRoutes.gsignUp, { name, email, password });
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const userLogin = async (email: string, password: string) => {
  try {
    const res = await Api.post(UserRoutes.userLogin, { email, password });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const ForgotPassword = async (email: string) => {
  try {
    const res = await Api.post(UserRoutes.forgotPassword, { email });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const verifyOtpForgotPassword = async (otp: string) => {
  try {
    const res = await Api.post(UserRoutes.verifyOtpForgotPassword, { otp });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const passwordChange = async (password: string) => {
  try {
    const res = await Api.post(UserRoutes.changePassword, { password });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const allParlours = async (currentPage: number) => {
  try {
    const res = await Api.get(`${UserRoutes.allParlours}?page=${currentPage}`);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const singleParlourDetails = async (id: string) => {
  try {
    const res = await Api.get(`${UserRoutes.parlourDetails}/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const userprofile = async () => {
  try {
    const res = await Api.get(UserRoutes.profile);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const changeUserName = async (name: string) => {
  try {
    const res = await Api.put(UserRoutes.changeUserName, { name });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const changeUserPassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const res = await Api.put(UserRoutes.changeUserPassword, {
      currentPassword,
      newPassword,
    });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const changeUserEmail = async (email: string) => {
  try {
    const res = await Api.put(UserRoutes.changeUserEmail, { email });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const changeUserEmailSave = async (otp: number) => {
  try {
    const res = await Api.put(UserRoutes.changeUserEmailSave, { otp });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const deleteProfilePicture = async () => {
  try {
    const res = await Api.put(UserRoutes.deleteProfilePicture);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const changeProfilePicture = async (formData: FormData) => {
  try {
    const res = await Api.put(UserRoutes.changeProfilePicture, formData);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

//getting all categories of a parlour
export const getAllCategories = async (id: string) => {
  try {
    const res = await Api.get(`${UserRoutes.getAllCategories}?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

//get all service of a parlour
export const getAllServices = async (id: string) => {
  try {
    const res = await Api.get(`${UserRoutes.getAllServices}?id=${id}`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};


//booking
export const bookingServices = async (services:Services[],id:string) =>{
  try{
    const res = await Api.post(`${UserRoutes.bookingServices}?id=${id}&services=${services}}`)
    return res
  }catch(error){
    errorHandle(error as Error)
  }
}

export const userLogout = async () => {
  try {
    const res = await Api.post(UserRoutes.userLogout);
    return res;
  } catch (error) {
    console.log(error);
  }
};
