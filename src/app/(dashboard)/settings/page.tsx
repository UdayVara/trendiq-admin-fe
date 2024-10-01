"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdLockReset } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { createEnviroment, fetchEnviroments, updateEnviroment } from "@/actions/enviroment.actions";
import { toast } from "sonner";
import { LiaEdit } from "react-icons/lia";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
function page() {
  const [enviroments, setEnviroments] = useState([]);
  const [open,setOpen] = useState(false)
  const [value,setValue] = useState({key:"",value:""})
  const [selectedEnv,setSelectedEnv] = useState<any>(null)
  const getEnviroments = async () => {
    const res = await fetchEnviroments()

    if(res.success){
      setEnviroments(res.data)
    }else{
      toast.error(res.message)
    }
  }

  const addEditEnviroment = async() => {
    try {

      if(selectedEnv){
        const res = await updateEnviroment({...value,id:selectedEnv?.id})

        if(res.success){
          toast.success(res.message)
          setOpen(false)
          getEnviroments()
        }else{
          toast.error(res.message)
        }
      }else{
        const res = await createEnviroment(value)

      if(res.success){
        toast.success(res.message)
        setOpen(false)
        getEnviroments()
      }else{
        toast.error(res.message)
      }
      }
      
    } catch (error:any) {
      toast.error(error?.message || "Internal Server Error")
    }
  }
  useEffect(()=>{
    getEnviroments()
  },[])
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="heading">
            <h2 className="mt-5 text-4xl font-semibold dark:text-neutral-50 text-neutral-950">
              Settings
            </h2>
            <h5 className="text-base text-neutral-700 dark:text-neutral-300 mt-1">
              Manage Your Prefrence
            </h5>
          </div>
          <div className="flex flex-row gap-3">
            <Button
              title="Reset"
              className=" text-red-800/90"
              variant={"ghost"}
              size={"icon"}
            >
              <MdLockReset size={35} />
            </Button>
            <Button title="Add" onClick={()=>{
              setOpen(true)
            }} variant={"default"} size={"icon"}>
              <IoMdAdd size={20} />
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator className="mt-4 h-0.5" />
        <div className="mt-4">
          <h4 className="mt-6 text-lg mb-4">Enviroment Variables</h4>
          {enviroments.map((enviroment:any,index:number) => {
            return (
              <div key={index} className="p-5 shadow flex flex-row items-center gap-3 justify-normal bg-slate-50 rounded dark:bg-neutral-800">
                <Input
                  value={enviroment.value}
                  className="bg-slate-300 dark:bg-neutral-900"
                  disabled
                />
                <div className="flex flex-row items-center gap-3">
                <CopyIcon />
                <LiaEdit size={25} onClick={()=>{
                  setSelectedEnv(enviroment)
                  setOpen(true)
                }}/>
                </div>
              </div>
            );
          })}
          
        </div>
      </div>

      <Dialog open={open} onOpenChange={(value)=>{
        setSelectedEnv(null)
        setOpen(value)
      }}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Enviroment</DialogTitle>
          <DialogDescription>
            Make changes to Enviroment Variable here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Key
            </Label>
            <Input
              id="name"
              placeholder="Enter Key Here"
              className="col-span-3"
              defaultValue={selectedEnv?.key ? selectedEnv?.key : ""}
              onChange={(e)=>{
                setValue({...value,key:e.target.value})
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Value
            </Label>
            <Input
              id="username"
              placeholder="Enter Value Here"
              className="col-span-3"
              defaultValue={selectedEnv?.value ? selectedEnv?.value : ""}
              onChange={(e)=>{
                setValue({...value,value:e.target.value})
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={addEditEnviroment} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default page;
