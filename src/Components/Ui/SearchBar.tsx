"use client";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadMenuDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
import { usEServerRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar555() {
  const router = usEServerRouter();

  const [isShow, setShow] = useState(false);
  const [data, setData] = useState<Array<ReadMenuDetailViewModel>>([]);

  useEffect(() => {
    const fetches = async () => {
      const fetchData = await FetchApi.Menu.ReadMenuDetail({});
      setData(fetchData);
      setShow(true);
    };
    fetches();
  }, []);

  function redirectToRoute(val: string) {
    const [category, id, name] = val?.split("##") ?? ["", "", ""];
    router.push(`/menu/${encodeURI(category)}/${id}/${encodeURI(name)}`);
  }

  if (isShow)
    return (
      <form className="flex items-center justify-center py-2">
        <div className="bg-white border-2 flex px-2 py-1 rounded-lg items-center">
          <div>
            <FaSearch />
          </div>
          <select
            title="s"
            name="product"
            id="product"
            className="p-1 px-2 text-sm focus:outline-none bg-white"
            onChange={(e) => redirectToRoute(e.target.value)}
          >
            {data.map((category, i) => {
              return (
                <optgroup key={i} label={category.Name} className="pt-12">
                  {category.Products.map((product, i) => {
                    return (
                      <option
                        key={i}
                        value={`${category.Id}##${product.Id}##${product.Name}`}
                      >
                        {product.Name}
                      </option>
                    );
                  })}
                </optgroup>
              );
            })}
          </select>
        </div>
      </form>
    );
}
