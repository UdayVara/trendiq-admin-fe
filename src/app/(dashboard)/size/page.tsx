"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import { fetchCategories } from "@/api/categories.actions";
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
import { columns, Size } from "./columns";
import { DataTable } from "./data-table";
import { Category } from "../categories/columns";
import {
  createSize,
  deleteSize,
  fetchSizes,
  updateSize,
} from "@/api/size.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CategoriesPage() {
  const [data, setData] = useState<Size[]>([]);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Size | null>(null);
  const [size, setSize] = useState({ name: "", description: "", category: "" });

  useEffect(() => {
    if (selected) {
      setSize({
        name: selected.name,
        description: selected.description,
        category: selected.category.id,
      });
    }
  }, [selected]);
  const getCategories = async () => {
    const res = await fetchCategories();

    if (res.success) {
      setCategories(res.data);
    } else {
      toast.error(res.message);
    }
  };
  const getSizes = async () => {
    const res = await fetchSizes();

    if (res.success) {
      setData(res.data);
    } else {
      toast.error(res.message);
    }
  };
  console.debug("Categories", categories);
  const addEditSize = async () => {
    console.debug(size);
    if (!selected) {
      const res = await createSize(size);

      if (res.success) {
        toast.success(res.message);
        setData([res?.new, ...data]);
        setOpen(false);
        setSize({ name: "", description: "", category: "" });
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await updateSize({
        name: size.name,
        description: size.description,
        category: size.category,
        sizeId: selected.id,
      });

      if (res.success) {
        toast.success(res.message);
        getSizes();
        setOpen(false);
        setSize({ name: "", description: "", category: "" });
      } else {
        toast.error(res.message);
      }
    }
  };

  const deleteSizeApi = async (id: string) => {
    const res = await deleteSize({ id });

    if (res.success) {
      toast.success(res.message);
      setData((val) => val.filter((item) => item.id != id));
    } else {
      toast.error(res.message);
    }
  };
  useEffect(() => {
    getSizes();
    getCategories();
  }, []);
  return (
    <>
      <div className="container mx-auto mt-5 mb-8">
        <div className="flex flex-row items-center justify-between">
          <div className="">
            <h2 className="mt-5 text-4xl font-semibold dark:text-neutral-50 text-neutral-950">
              Size
            </h2>
            <h5 className="text-base text-neutral-700 dark:text-neutral-300 mt-1">
              Manage Your Size For Your Products
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
            columns={columns}
            data={data}
            setOpen={setOpen}
            setSelected={setSelected}
            deleteSize={deleteSizeApi}
          />
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selected ? "Edit" : "Add"} Size</DialogTitle>
            <DialogDescription>Add Sizes For Your Products</DialogDescription>
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
                  setSize({ ...size, name: e.target.value });
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
                  setSize({ ...size, description: e.target.value });
                }}
              />
            </div>
            <div className="grid grid-cols-4  items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Category
              </Label>
              <Select
                defaultValue={selected?.category?.id || ""}
                onValueChange={(value) => {
                  setSize({ ...size, category: value });
                }}
              >
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={addEditSize}>
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
