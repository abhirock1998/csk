import BlogCard from "./card";

import blogs from "@/constants/blogs";

const BlogSection = () => {
  return (
    <section className="lg:p-[10%] p-[5%] mb-10">
      <h2 className="tracking-[-0.2px] text-[2.1rem] font-semibold leading-[2.5rem] mb-4 text-center max-w-[48rem] mx-auto">
        Our Blogs
      </h2>

      <p className="text-secondary_text text-center w-auto  mb-0 text-[1.1rem] max-sm:text-[1rem] max-sm:leading-normal font-normal leading-[1.8rem]">
        Our blog provides insightful information about unlisted shares, offering
        a deeper understanding of how these assets work, their potential
        benefits, and the risks involved. Whether you're new to unlisted shares
        or looking to expand your knowledge, we cover topics such as investment
        strategies, valuation methods, market trends, and regulatory aspects.
        Stay updated with expert tips and guides to navigate the unlisted share
        market effectively.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] mt-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...{ ...blog }} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
