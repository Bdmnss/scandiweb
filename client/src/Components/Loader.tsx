const Loader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <img
        src="/brandIcon.svg"
        alt="Loading..."
        className="mb-6 size-32 animate-spin"
      />
      <p className="animate-pulse text-xl font-medium text-gray-600">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
