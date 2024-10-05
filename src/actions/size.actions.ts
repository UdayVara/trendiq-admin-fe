"use server";

import axiosInstance from "@/utils/axios";

export const fetchSizes = async () => {
  try {
    const res = await axiosInstance.get("/size");

    if (res.data?.statusCode == 200) {
      return {
        data: res.data?.sizes,
        message: "Size Fetched Successfully",
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

export const createSize = async (data: {
  name:string,
  description:string,
  category:string,
}) => {
  try {
    const res = await axiosInstance.post("/size", data);
    if (res.data?.statusCode == 201) {
        return {success:true,message:"Size Created Successfully",new:res.data?.newSize}
    }else{
        return {success:false,message:res?.data?.message || "Internal Server Error"}
    }
  } catch (error) {
    console.log("Error Occured :- ",error)
    return {success:false,message:"Internal Server Error"}
  }
};
export const updateSize = async (data: {
  name:string,
  description:string,
  sizeId:string,
  category:string,
}) => {
  try {
    const res = await axiosInstance.patch("/size", data);
    if (res.data?.statusCode == 201) {
        return {success:true,message:"Size Updated Successfully"}
    }else{
        return {success:false,message:res?.data?.message || "Internal Server Error"}
    }
  } catch (error) {
    console.log("Error Occured :- ",error)
    return {success:false,message:"Internal Server Error"}
  }
};
export const deleteSize= async (data: {
  id:string;
}) => {
  try {
    const res = await axiosInstance.delete(`/size/${data.id}`);
    if (res.data?.statusCode == 201) {
        return {success:true,message:"Size Deleted Successfully"}
    }else{
        return {success:false,message:res?.data?.message || "Internal Server Error"}
    }
  } catch (error) {
    console.log("Error Occured :- ",error)
    return {success:false,message:"Internal Server Error"}
  }
};
