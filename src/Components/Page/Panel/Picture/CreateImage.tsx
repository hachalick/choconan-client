import ImageUploaderPanel from "@/Components/Customs/ImageUploaderPanel";
import Box from "@/Components/Ui/Box";
import { H } from "@/Components/Ui/H";
import React, { useState } from "react";

export default function CreateImage() {
  const [uploadImage, setUploadImage] = useState(true);

  return (
    <>
      <Box variant="primary">
        <H size={2}>آپلود عکس</H>
      </Box>
      <ImageUploaderPanel
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
      />
    </>
  );
}
