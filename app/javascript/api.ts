import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  headers: {
    "X-CSRF-Token":
      document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content") || "" ,    "Accept": "application/json" },


});


interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  redirect_url?: string;
  errors?: string[];
  message?:string;
}

export async function postRequest<T>(
  url: string,
  body: any
): Promise<ApiResponse<T>> {
  try {
    const response = await api.post(url, body);
    

    if (response.data.success) {
           if (response.data.message) {
sessionStorage.setItem("toastMessage", response.data.message);      }

      return { 
        success: true, 
        data: response.data, 
        redirect_url: response.data.redirect_url 
      };

    } else {
      if (response.data.errors) {
        response.data.errors.forEach((err: string) => toast.error(err));
      } else {
        toast.error("Unknown error.");
      }
      return { success: false, errors: response.data.errors || ["Unknown error."] };
    }
  } catch (error: any) {
    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((err: string) => toast.error(err));
      return { success: false, errors: error.response.data.errors };
    } else if (error.response?.data?.error) {
      toast.error(error.response.data.error);
      return { success: false, errors: [error.response.data.error] };
    } else {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
      return { success: false, errors: ["An unexpected error occurred."] };
    }
  }
}


export async function deleteRequest<T>(
  url: string,
  body: any
): Promise<ApiResponse<T>> {
  try {
    const response = await api.delete(url, body);
    

    if (response.data.success) {
      return { success: true, data: response.data, redirect_url: response.data.redirect_url };

    } else {
      if (response.data.errors) {
  response.data.errors.forEach((err: string) => toast.error(err));
      } else {
        toast.error("Unknown error.");
      }
      return { success: false, errors: response.data.errors || ["Unknown error."] };
    }
  } catch (error: any) {
    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((err: string) => toast.error(err));
      return { success: false, errors: error.response.data.errors };
    } else if (error.response?.data?.error) {
      toast.error(error.response.data.error);
      return { success: false, errors: [error.response.data.error] };
    } else {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
      return { success: false, errors: ["An unexpected error occurred."] };
    }
  }
}


export async function updateRequest<T>(
  url: string,
  body: any
): Promise<ApiResponse<T>> {
  try {
    const response = await api.put(url, body);
    
    if (response.data.success) {
      return { success: true, data: response.data, redirect_url: response.data.redirect_url };

    } else {
      if (response.data.errors) {
        response.data.errors.forEach((err: string) => toast.error(err));
      } else {
        toast.error("Unknown error.");
      }
      return { success: false, errors: response.data.errors || ["Unknown error."] };
    }
  } catch (error: any) {
    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((err: string) => toast.error(err));
      return { success: false, errors: error.response.data.errors };
    } else if (error.response?.data?.error) {
      toast.error(error.response.data.error);
      return { success: false, errors: [error.response.data.error] };
    } else {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
      return { success: false, errors: ["An unexpected error occurred."] };
    }
  }
}
