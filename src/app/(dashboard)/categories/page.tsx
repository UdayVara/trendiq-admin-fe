"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { DataTable } from "./data-table";
import { Category, columns } from "./columns";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "@/actions/categories.actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function CategoriesPage() {
  const [data, setData] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({ name: "", description: "" });
  const [selected, setSelected] = useState<Category | null>(null);
  const getCategories = async () => {
    const res = await fetchCategories();

    if (res.success) {
      setData(res.data);
    } else {
      toast.error(res.message);
    }
  };

  const addEditCategory = async () => {
    if (!selected) {
      const res = await createCategory(category);

      if (res.success) {
        toast.success(res.message);
        setData([res?.new, ...data]);
        setOpen(false);
        setCategory({ name: "", description: "" });
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await updateCategory({ ...category, id: selected.id });

      if (res.success) {
        toast.success(res.message);
        getCategories();
        setOpen(false);
        setCategory({ name: "", description: "" });
      } else {
        toast.error(res.message);
      }
    }
  };

  const deleteCategoryApi = async (id: string) => {
    const res = await deleteCategory({ id });

    if (res.success) {
      toast.success(res.message);
      setData((val) => val.filter((item) => item.id != id));
    } else {
      toast.error(res.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
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
            onClick={() => setOpen(true)}
          >
            <IoMdAdd size={20} />
          </Button>
        </div>
        <div className="mt-4">
          <DataTable
            deleteCategory={deleteCategoryApi}
            columns={columns}
            data={data}
            setOpen={setOpen}
            setSelected={setSelected}
          />
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selected ? "Edit" : "Add"} Category</DialogTitle>
            <DialogDescription>
              Add Category For Your Products
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                defaultValue={selected?.name}
                id="name"
                placeholder="Enter Name Here"
                className="col-span-3"
                onChange={(e) => {
                  setCategory({ ...category, name: e.target.value });
                }}
              />
            </div>
            <div className="grid grid-cols-4  items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Textarea
                defaultValue={selected?.description}
                rows={4}
                id="description"
                className="col-span-3"
                placeholder="Enter Description Here"
                onChange={(e) => {
                  setCategory({ ...category, description: e.target.value });
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={addEditCategory}>
              Save changes
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => {
                setOpen(false);
              }}
              type="button"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CategoriesPage;
