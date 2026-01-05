type TGetBlogItemResponseDto = {
  blog_id: string;
  publish: boolean;
  meta_title: string;
  short_description: string | null;
  title: string;
  src_banner: string | null;
  blog: string | null;
  create_at: Date;
  update_at: Date;
};
