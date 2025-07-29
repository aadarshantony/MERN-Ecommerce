import ErrorSVG from '../assets/500.svg'

const InternalServerError = ({ error }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-white flex-col">
      <img src={ErrorSVG} alt="loading-screen" className="h-[500px]" />
      <p>{error}</p>
      <a href="https://storyset.com/internet" className="text-gray-400 font-light mt-6">Internet illustrations by Storyset</a>
    </div>
  )
}

export default InternalServerError