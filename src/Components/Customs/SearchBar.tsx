"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar555() {
  const router = useRouter();

  const [isShow, setShow] = useState(false);
  const [data, setData] = useState<TIdCategoriesMenu>([]);

  useEffect(() => {
    const fetches = async () => {
      const fetchData = await FetchApi.Menu.fetchAllProductMenu();
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
      <form className="flex items-center justify-center py-2 cooooooooooooooooooloooooooooo">
        <div className="bg-white border-2 bordercooooooooooooooooooloooooooooo300 flex px-2 py-1 rounded-lg items-center">
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
                <optgroup key={i} label={category.category} className="pt-12">
                  {category.products.map((product, i) => {
                    return (
                      <option
                        key={i}
                        value={`${category.category}##${product.id}##${product.name}`}
                      >
                        {product.name}
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


