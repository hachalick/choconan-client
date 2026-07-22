import Box from "@/Components/Element/Box";
import { H } from "@/Components/Element/H";
import ImageUploaderPanel from "@/Components/Ui/ImageUploaderPanel";
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
