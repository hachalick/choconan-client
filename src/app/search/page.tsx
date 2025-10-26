import React from "react";
import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import { ERoute } from "@/Common/Enums/Routs";
import SearchBoxMenu from "@/Components/Customs/SearchBoxMenu";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import P from "@/Components/Ui/P";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

async function Search({ searchParams }: { searchParams: { q?: string } }) {
  let result: TIdProductsSearchMenu = [];
  if (searchParams.q) {
    result = await FetchApi.Menu.fetchSearch({ query: searchParams.q.trim() });
  }
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/search", name: "جستجو" },
        ]}
      />
      <SearchBoxMenu value={searchParams.q?.trim()} />
      <div className="flex flex-wrap flex-col gap-4">
        {result.map((card, i) => (
          <Box variant="primary" key={i}>
            <div className="flex gap-4 flex-col md:flex-row justify-center items-center">
              <div className="shrink-0">
                <img
                  src={ERoute.HOST + card.src}
                  width={100}
                  height={100}
                  alt={card.name}
                  className="md:w-32 md:h-32 w-44 h-44 object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-4 grow w-full">
                <H size={3}>{card.name}</H>
                <P size={4}>{card.description}</P>
                <div className="flex justify-end gap-4">
                  <Button
                    title="برو به محصول"
                    variant="secondary"
                    href={`/menu/${card.category}/${card.id}`}
                  >
                    برو به محصول
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </Layout>
  );
}

export default Search;
