"use server";

import axiosInstance from "@/utils/axios";

export const fetchCategories = async () => {
  try {
    const res = await axiosInstance.get("/category");

    if (res.data?.statusCode == 200) {
      return {
        data: res.data?.categories,
        message: "Categories Fetched Successfully",
        success: true,
      };
    } else {
      return {
        success: false,
        message: res?.data?.message || "Internal Server Error",
      };
    }
  } catch (error) {
    console.log("Error Occured :- ", error);
    return { success: false, message:"Internal Server Error" };
  }
};

export const createCategory = async (data: {
  name:string,
  description:string
}) => {
  try {
    const res = await axiosInstance.post("/category", data);
    if (res.data?.statusCode == 201) {
        return {success:true,message:"Category Created Successfully",new:res.data?.newCategory}
    }else{
        return {success:false,message:res?.data?.message || "Internal Server Error"}
    }
  } catch (error) {
    console.log("Error Occured :- ",error)
    return {success:false,message:"Internal Server Error"}
  }
};
export const updateCategory = async (data: {
  name:string,
  description:string,
  id:string
}) => {
  try {
    const res = await axiosInstance.patch("/category", data);
    if (res.data?.statusCode == 201) {
        return {success:true,message:"Enviroment Updated Successfully"}
    }else{
        return {success:false,message:res?.data?.message || "Internal Server Error"}
    }
  } catch (error) {
    console.log("Error Occured :- ",error)
    return {success:false,message:"Internal Server Error"}
  }
};
export const deleteCategory= async (data: {
  id:string;
}) => {
  try {
    const res = await axiosInstance.delete(`/category/${data.id}`);
    if (res.data?.statusCode == 201) {
        return {success:true,message:"Category Deleted Successfully"}
    }else{
        return {success:false,message:res?.data?.message || "Internal Server Error"}
    }
  } catch (error) {
    console.log("Error Occured :- ",error)
    return {success:false,message:"Internal Server Error"}
  }
};
