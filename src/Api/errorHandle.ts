import { AxiosError } from 'axios';
import { toast } from 'sonner'

interface ErrorResponse {
    message: string;
    // Add other properties based on the structure of your JSON response
}

const errorHandle = (error: Error | AxiosError ) => {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as ErrorResponse;
        if (errorResponse.message) {
            if (errorResponse.message === 'You are blocked by admin') {
                localStorage.removeItem('userInfo');
                location.href = '/login';
                toast.error(errorResponse.message);
            } 
            else if (errorResponse.message === 'Vendor have been blocked by admin') {
                localStorage.removeItem('vendorInfo');
                location.href = '/parlour';
                toast.error(errorResponse.message);
            } 
            else {
                toast.error(errorResponse.message);
            }
        } else {
            toast.error("Error no response")
        }
    } else {
        toast.error('An error occurred. Please try again!');
    }
};

export default errorHandle;