"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/Images/logo.png";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { ModeToggler } from "./ModeToggler";
import { HiBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className=" z-10 dark:bg-neutral-900/90 border-b-2 shadow-sm py-2 lg:px-0 px-3 flex justify-between lg:justify-around items-center">
        <Link href={"/"}>
          <Image
            src={logo}
            width={1000}
            height={1000}
            alt="TrendiQ - Logo"
            className="h-10  w-auto"
          />
        </Link>
        <div className="lg:flex hidden self-center  flex-row items-center gap-7">
          <Link
            href={"/"}
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-neutral-100 transition-all "
          >
            Overview
          </Link>
          <Link
            href={"/"}
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-neutral-100 transition-all"
          >
            Billboards
          </Link>
          <Link
            href={"/"}
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-neutral-100 transition-all"
          >
            Categories
          </Link>
          <Link
            href={"/"}
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-neutral-100 transition-all"
          >
            Sizes
          </Link>
          <Link
            href={"/"}
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-neutral-100 transition-all"
          >
            Colors
          </Link>
          <Link
            href={"/"}
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-neutral-100 transition-all"
          >
            Products
          </Link>
          <Link
            href={"/"}
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-neutral-100 transition-all"
          >
            Orders
          </Link>
          <Link
            href={"/"}
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-neutral-100 transition-all"
          >
            Settings
          </Link>
        </div>
        <div className="flex lg:gap-2 gap-0.5 items-center">
          {!open ? (
            <HiBars3
              size={25}
              onClick={() => {
                setOpen(true);
              }}
              className="lg:hidden block cursor-pointer"
            />
          ) : (
            <IoMdClose
              size={25}
              onClick={() => {
                setOpen(false);
              }}
              className="lg:hidden block cursor-pointer"
            />
          )}
          <ModeToggler />
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-row items-center gap-2">
                <FaUser /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 flex flex-row items-center gap-2">
                {" "}
                <TbLogout2 /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div
        className={`w-full lg:hidden shadow-lg bg-white dark:bg-neutral-800 z-20 fixed top-16 -mt-2 h-max flex flex-col border-t gap-3 pl-4 transition-all duration-300 origin-top py-2 ${
          open ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <Link
          href={"/"}
          className="text-neutral-600 dark:text-neutral-300 text-lg hover:text-black dark:hover:text-neutral-100 transition-all "
        >
          Overview
        </Link>
        <Link
          href={"/"}
          className="text-neutral-600 dark:text-neutral-300 text-lg hover:text-black dark:hover:text-neutral-100 transition-all"
        >
          Billboards
        </Link>
        <Link
          href={"/"}
          className="text-neutral-600 dark:text-neutral-300 text-lg hover:text-black dark:hover:text-neutral-100 transition-all"
        >
          Categories
        </Link>
        <Link
          href={"/"}
          className="text-neutral-600 dark:text-neutral-300 text-lg hover:text-black dark:hover:text-neutral-100 transition-all"
        >
          Sizes
        </Link>
        <Link
          href={"/"}
          className="text-neutral-600 dark:text-neutral-300 text-lg hover:text-black dark:hover:text-neutral-100 transition-all"
        >
          Colors
        </Link>
        <Link
          href={"/"}
          className="text-neutral-600 dark:text-neutral-300 text-lg hover:text-black dark:hover:text-neutral-100 transition-all"
        >
          Products
        </Link>
        <Link
          href={"/"}
          className="text-neutral-600 dark:text-neutral-300 text-lg hover:text-black dark:hover:text-neutral-100 transition-all"
        >
          Orders
        </Link>
        <Link
          href={"/"}
          className="text-neutral-600 dark:text-neutral-300 text-lg hover:text-black dark:hover:text-neutral-100 transition-all"
        >
          Settings
        </Link>
      </div>
    </>
  );
}

export default Header;
