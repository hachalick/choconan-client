import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import {
  Table,
  TableBody,
  TableCaption,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@/Components/Ui/Table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function BlogsPanel() {
  const [blogs, setBlogs] = useState<TGetIdBlogs>([]);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await FetchApi.Blog.fetchBlogsPanel();
      setBlogs(blogs);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Box variant="primary">
        <H size={2}>بلاگ</H>
      </Box>
      <Table variant="primary">
        <TableCaption position="bottom">
          Table 3.1: Professional wrestlers and their signature moves.
        </TableCaption>
        <TableThead>
          <TableTr>
            <TableTh>
              <Button
                title="add"
                variant="guest"
                StartIcon={IoIosAddCircleOutline}
              />
            </TableTh>
            <TableTh>تیتر</TableTh>
            <TableTh>وضعیت انتشار</TableTh>
            <TableTh>ویرایش</TableTh>
          </TableTr>
        </TableThead>
        <TableBody>
          {blogs.map((blog) => (
            <TableTr key={blog.blog_id}>
              <TableTd>{blog.title || "ندارد"}</TableTd>
              <TableTd>{blog.publish ? "شده" : "نشده"}</TableTd>
              <TableTd>
                <Link href={`/account/blog/${blog.blog_id}`}>برو</Link>
              </TableTd>
            </TableTr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// export default function BtnCreateBlog() {
//   const router = useRouter();

//   const onClickCreateBlog = async () => {
//     const access_token = sessionStorage.getItem("access_token") || "";
//     const { create, id } = await fetchCreateBlogPanel({ access_token });
//     if (create) router.push(`/account/blog/${id}`);
//   };

//   return (
//     <div>
//       <button
//         className="mr-auto mb-3 cooooooooooooooooooloooooooooo w-40 bg-gradient-to-br from-cooooooooooooooooooloooooooooo to-[#4e3751] rounded-lg shadow-primary-sm px-3 py-1 flex items-center justify-center"
//         onClick={() => onClickCreateBlog()}
//       >
//         <LuFilePlus2 />
//         <span className="mx-auto">بلاگ جدید</span>
//       </button>
//     </div>
//   );
// }
