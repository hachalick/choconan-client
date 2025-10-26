import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { ERoute } from "@/Common/Enums/Routs";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import React, { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

export default function ReadImage() {
  const [uploadImage, setUploadImage] = useState(true);
  const [listImg, setListImg] = useState<TIdImages>([]);

  useEffect(() => {
    if (uploadImage) {
      const access_token = sessionStorage.getItem("access_token") || "";
      const fetchData = async () => {
        const res = await FetchApi.File.fetchGetImages({ access_token });
        setListImg(res);
        setUploadImage(false);
      };
      fetchData();
    }
  }, [uploadImage]);

  const onClickCopy = ({ text }: { text: string }) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      title: "مسیر عکس کپی شد",
      icon: "success",
      confirmButtonText: "باشه",
    });
  };

  const onClickDelete = async ({ image_id }: { image_id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.File.fetchDeleteImage({ access_token, image_id });
    setUploadImage(true);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>عکس</H>
      </Box>
      <Box variant="guest">
        <div className="flex flex-wrap gap-4 justify-between">
          {listImg.map((img) => (
            <Box key={img.dir} variant="secondary" wFull>
              <div className="flex justify-center items-center flex-col gap-2">
                <img
                  width={30}
                  height={30}
                  src={ERoute.HOST + img.dir}
                  alt=""
                  className="w-28 h-28 object-contain"
                  loading="lazy"
                />
                <div className="flex flex-wrap w-full gap-4 justify-center">
                  <Button
                    type="button"
                    title="کپی مسیر عکس"
                    variant="primary"
                    onClick={() => onClickCopy({ text: img.dir })}
                    StartIcon={MdOutlineContentCopy}
                  />
                  <Button
                    type="button"
                    title="حذف محصول"
                    variant="error"
                    onClick={() => onClickDelete({ image_id: img.image_id })}
                    StartIcon={RiDeleteBin5Line}
                  />
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Box>
    </>
  );
}
