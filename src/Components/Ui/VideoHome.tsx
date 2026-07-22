import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import React from "react";

export default async function VideoHome() {
  const res = await FetchApi.Video.ReadLastVideoCategoryDetail({
    Id: "0c77d935-28ad-4901-8e70-52a6d150f501",
  });

  return (
    <div className="mt-5">
      <div className="flex py-4">
        <iframe
          title={res.Name}
          src={res.IFram}
          className="w-full aspect-video rounded-2xl"
        />
      </div>
    </div>
  );
}
