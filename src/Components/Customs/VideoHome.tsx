import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import React from "react";

export default async function VideoHome() {
  const res = await FetchApi.Video.fetchLastVideo({ category: "aparat" });
  return (
    <div className="mt-5">
      <div className="flex py-4">
        <iframe
          title={res.name}
          src={res.link}
          className="w-full aspect-video rounded-2xl"
        />
      </div>
    </div>
  );
}
