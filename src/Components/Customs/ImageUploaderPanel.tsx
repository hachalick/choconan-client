import React, { useEffect, useState } from "react";
import Box from "../Ui/Box";
import Form from "../Ui/Form";
import { Input } from "../Ui/Input";
import { Button } from "../Ui/Button";
import { Option, Select } from "../Ui/Select";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

export default function ImageUploaderPanel({
  uploadImage,
  setUploadImage,
}: {
  uploadImage: boolean;
  setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [srcImage, setSrcImage] = useState<string>(
    "/assets/image/logo/s-logo.jpg"
  );
  const [image, setImage] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadImageSrc, setUploadImageSrc] = useState<"main" | "product">(
    "main"
  );

  useEffect(() => {
    setSrcImage("/assets/image/logo/s-logo.jpg");
  }, [uploadImage]);

  const onChange = (e: any) => {
    const file = e.target.files;
    if (file !== null) {
      const img = file[0];
      setSrcImage(URL.createObjectURL(img));
      setImage(img);
    }
  };

  const onClickUploadImage = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    if (image && access_token) {
      setUploadImage(false);
      const newForm = new FormData();
      newForm.append("file", image);
      switch (uploadImageSrc) {
        case "main":
          await FetchApi.File.fetchImage({
            access_token,
            newForm,
            setSrcImage,
            setUploadImage,
            setUploadProgress,
          });
          break;
        case "product":
          await FetchApi.File.fetchImageProduct({
            access_token,
            newForm,
            setSrcImage,
            setUploadImage,
            setUploadProgress,
          });
          break;
      }
    }
  };

  return (
    <Box variant="guest">
      <div className="flex flex-col gap-4">
        <div className="mx-auto">
          <Box variant="primary">
            <div className="flex flex-col gap-4">
              <img src={srcImage} alt="" className="w-24 object-contain" />
              <div className="relative flex justify-center items-center">
                <Box variant="warning">{uploadProgress} %</Box>
              </div>
            </div>
          </Box>
        </div>
        <Form variant="guest">
          <Input
            type="file"
            id={`inputImageAdd-${uploadImageSrc}`}
            placeholder="s"
            multiple={false}
            accept="image/png,image/jpeg,image/jpg"
            title="uploadImage"
            onChange={(e) => onChange(e)}
            onDrop={(e) => e.preventDefault()}
          />
          <div className="flex gap-4 justify-between">
            <Select
              name="d"
              title=""
              onChange={(e) =>
                setUploadImageSrc(e.target.value as "main" | "product")
              }
            >
              <Option value="main">مسیر اصلی</Option>
              <Option value="product">مسیر محصولات</Option>
            </Select>
            <Button
              type="button"
              title="call"
              variant="secondary"
              onClick={() =>
                document
                  .getElementById(`inputImageAdd-${uploadImageSrc}`)
                  ?.click()
              }
            >
              انتخاب عکس
            </Button>
            <Button
              type="button"
              title="call"
              variant="success"
              onClick={() => onClickUploadImage()}
            >
              آپلود عکس
            </Button>
          </div>
        </Form>
      </div>
    </Box>
  );
}
