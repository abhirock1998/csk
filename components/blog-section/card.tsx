import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const Card = ({ description, id, image, link, title }: Blog) => {
  return (
    <Link
      href="https://www.unlistedsharesindia.com/chennai-super-kings-csk-unlisted-shares"
      className="bg-white rounded-lg overflow-hidden transition duration-300 group"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-52 max-h-52 object-cover rounded-2xl mb-[32px] group-hover:scale-[1.05] transition-all duration-150"
      />
      <div className="">
        <div className="flex items-start justify-center gap-x-4 ">
          <h3 className="text-text_color mt-0 text-[1.2rem] font-semibold leading-[1.8rem] mb-4 flex-1">
            {title}
          </h3>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group:hover:transform group-hover:rotate-45 transition-transform duration-300"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="CurrentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
        <div className="text-secondary_text tracking-normal text-[1rem] leading-[1.5]">
          {description}
        </div>
      </div>
    </Link>
  );
};

export default Card;
