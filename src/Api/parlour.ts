import Api from "../Services/axios";
import parlourRoutes from "../Services/endpoints/vendorEndpoints";
import errorHandle from "../Api/errorHandle"


export const signup = async (name: string, email: string, password: string) => {
  try {
    const res = await Api.post(parlourRoutes.signup, { name, email, password });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const res = await Api.post(parlourRoutes.otp, { otp });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const parlourLogin = async (email: string, password: string) => {
  try {
    const res = await Api.post(parlourRoutes.parlourLogin, { email, password });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const gParlourSignup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await Api.post(parlourRoutes.gParlourSignup, {
      name,
      email,
      password,
    });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const vendorForgotPassword = async (email: string) => {
  try {
    const res = await Api.post(parlourRoutes.vendorForgotPassword, { email });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const vendorverifyOtpForgotPassword = async (otp: string) => {
  try {
    const res = await Api.post(parlourRoutes.vendorverifyOtpForgotPassword, {
      otp,
    });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const vendorChangePassword = async (password: string) => {
  try {
    const res = await Api.post(parlourRoutes.vendorChangePassword, {
      password,
    });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const addParlour = async (parlour: FormData) => {
  try {
    const res = await Api.post(parlourRoutes.addParlour, parlour);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const getParlourDetails = async () => {
  try {
    const res = await Api.get(parlourRoutes.getParlourDetails);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};


export const editParlour = async (formData:FormData) => {
  try {
    const res = await Api.put(parlourRoutes.editParlour,formData);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const categoriesToShow = async () => {
  try {
    const res = await Api.get(parlourRoutes.categoriesToShow);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const addService = async (formData: FormData) => {
  try {
    const res = await Api.post(parlourRoutes.addService, formData);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const allService = async (search: string, page: number) => {
  try {
    const res = await Api.get(
      `${parlourRoutes.allService}?search=${search}&page=${page}`
    );
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const editService = async (id: string, formData: FormData) => {
  try {
    const res = await Api.put(
      `${parlourRoutes.editService}?id=${id}`,
      formData
    );
    console.log("hai");
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};



export const listService = async (id: string) => {
  try {
    const res = await Api.put(`${parlourRoutes.listService}?id=${id}`);
    console.log("deyy");
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const vendorProfile = async () => {
  try {
    const res = await Api.get(parlourRoutes.vendorProfile);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const changeName = async (name: string) => {
  try {
    const res = await Api.put(parlourRoutes.editVendorName, name);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const changePasswordProfile = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const res = await Api.put(parlourRoutes.editVendorPassword, {
      currentPassword,
      newPassword,
    });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};

export const changeEmailProfile = async (email: string) => {
  try {
    const res = await Api.put(parlourRoutes.editVendorEmail, { email });
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)

  }
};


export const changeEmailVerifyOtp = async(otp:string)=>{
    try {
        const res = await Api.put(parlourRoutes.emailChangeVerifyOtp,{otp})
        return res 
    } catch (error) {
        console.log(error)
        errorHandle(error as Error)

    }
}


export const vendorLogout = async () => {
  try {
    const res = await Api.post(parlourRoutes.vendorLogout);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error)
    
  }
};
