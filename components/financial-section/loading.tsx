const Loading = ({
  title = "Fetching Financial Data...",
}: {
  title?: string;
}) => {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-xl font-semibold mb-4 text-secondary_text">
        {title}
      </h2>
      <div className="flex space-x-2">
        <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg text-secondary_text">
        Please wait while we load the latest market data.
      </p>
    </div>
  );
};

export default Loading;
