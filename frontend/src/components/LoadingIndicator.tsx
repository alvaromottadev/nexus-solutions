import DotLoader from "react-spinners/DotLoader";

export default function LoadingIndicator() {
  return (
    <div className="h-full flex flex-1 justify-center items-center">
      <DotLoader color="purple" size={96} />
    </div>
  );
}
