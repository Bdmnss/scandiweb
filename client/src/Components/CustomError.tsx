interface CustomErrorProps {
  message: string;
}

const CustomError = ({ message }: CustomErrorProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <img src="/brandIcon.svg" alt="Brand Icon" className="mb-6 size-24" />
      <h2 className="mb-2 text-2xl font-semibold text-red-600">
        Something went wrong
      </h2>
      <p className="max-w-md text-gray-700">{message}</p>
    </div>
  );
};

export default CustomError;
