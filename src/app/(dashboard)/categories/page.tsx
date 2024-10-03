import { Button } from "@/components/ui/button";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

const data:Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];
function CategoriesPage() {
  return (
    <div className="container mx-auto mt-5 mb-8">
      <div className="flex flex-row items-center justify-between">
        <div className="">
          <h2 className="mt-5 text-4xl font-semibold dark:text-neutral-50 text-neutral-950">
            Categories
          </h2>
          <h5 className="text-base text-neutral-700 dark:text-neutral-300 mt-1">
            Manage Your Categories
          </h5>
        </div>
        <Button
          className="self-end mb-1"
          title="Add"
          variant={"default"}
          size={"icon"}
        >
          <IoMdAdd size={20} />
        </Button>
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default CategoriesPage;
