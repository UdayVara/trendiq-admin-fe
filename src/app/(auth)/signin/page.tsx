"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/Images/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SigninSchema, SigninSchemaType } from "@/schemas/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAdmin } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchemaType>({ resolver: zodResolver(SigninSchema) });
  const router = useRouter();
  const handleSubmitForm: SubmitHandler<SigninSchemaType> = async (
    submitData
  ) => {
    try {
      const res = await signInAdmin(submitData);
      console.debug("res", res);
      toast.success(res.message);
      router.replace("/")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.debug("error", error);
      toast.error(error?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full flex flex-col justify-center items-center p-4 rounded bg-slate-100 shadow">
          <Image
            src={Logo}
            alt="Logo"
            className="w-44 bg-none"
            width={1000}
            height={1000}
          />
          <form className="w-full" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="w-full mt-9">
              <h4 className="text-lg ml-1">Email : </h4>
              <Input
                {...register("email")}
                type="email"
                className="w-full text-base"
              />
              {errors.email && (
                <span className="text-red-500 mt-0.5 ml-0.5">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="w-full mt-2">
              <h4 className="text-lg ml-1">Password : </h4>
              <Input
                {...register("password")}
                type="password"
                className="w-full text-base"
              />
              {errors.password && (
                <span className="text-red-500 mt-0.5 ml-0.5">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button size={"lg"} type="submit" className="w-full mt-8 text-base">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SigninPage;
