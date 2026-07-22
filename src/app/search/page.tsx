import React from "react";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import P from "@/Components/Element/P";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import SearchBoxMenu from "@/Components/Ui/SearchBoxMenu";
import { ReadSearchMenuDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  let result: Array<ReadSearchMenuDetailViewModel> = [];

  const { q } = await searchParams;

  if (q) {
    result = await FetchApi.Menu.ReadSearchMenuDetail({
      Text: decodeURI(q.trim()),
    });
  }

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.SEARCH, name: "جستجو" },
        ]}
      />
      <SearchBoxMenu value={q?.trim()} />
      <div className="flex flex-wrap flex-col gap-4">
        {result.map((card, i) => (
          <Box variant="primary" key={i}>
            <div className="flex gap-4 flex-col md:flex-row justify-center items-center">
              <div className="shrink-0">
                <img
                  src={EServerRoute.HOST + card.SrcImage}
                  width={100}
                  height={100}
                  alt={card.Name}
                  className="md:w-32 md:h-32 w-44 h-44 object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-4 grow w-full">
                <H size={3}>{card.Name}</H>
                <P size={4}>{card.Description}</P>
                <div className="flex justify-end gap-4">
                  <Button
                    title="برو به محصول"
                    variant="secondary"
                    href={`${EInnerRoute.MENU_PRODUCT}/${card.Id}`}
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
