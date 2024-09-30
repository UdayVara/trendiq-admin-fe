"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import React from "react";
import { MdLockReset } from "react-icons/md";

function page() {
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
          <Button title="Reset" className=" text-red-800/90" variant={"ghost"} size={"icon"}><MdLockReset size={35} /></Button>
        </div>
<DropdownMenuSeparator  className="mt-4 h-0.5"/>
        <div className="mt-4">
            <h5 className="text-lg">Add Enviroment Variables</h5>
            <div className="mt-4">
                <h3>Key</h3>
                <Input className="dark:bg-neutral-800"  />
            </div>
            <div className="mt-2">
                <h3>Value</h3>
                <Input className="dark:bg-neutral-800"  />
            </div>
            <Button className="mt-4">Submit</Button>

            <h4 className="mt-6 text-lg mb-4">Enviroment Variables</h4>

            <div className="p-5 shadow flex flex-row items-center gap-3 justify-normal bg-slate-50 rounded dark:bg-neutral-800">
                <Input value={"thisisrandomstring"} className="bg-slate-300 dark:bg-neutral-900" disabled/>
                <CopyIcon  />
            </div>
        </div>
      </div>
    </>
  );
}

export default page;
