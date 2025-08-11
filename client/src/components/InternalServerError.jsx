import ErrorSVG from '../assets/500.svg';

const InternalServerError = ({ error }) => {
  let errorText = "An unexpected error occurred";

  if (typeof error === 'string') {
    errorText = error;
  } else if (error?.response?.data?.message) {
    errorText = error.response.data.message;
  } else if (error?.message) {
    errorText = error.message;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white flex-col">
      <img src={ErrorSVG} alt="server-error" className="h-[500px]" />
      <p>{errorText}</p>
      <a
        href="https://storyset.com/internet"
        className="text-gray-400 font-light mt-6"
      >
        Internet illustrations by Storyset
      </a>
    </div>
  );
};

export default InternalServerError;
