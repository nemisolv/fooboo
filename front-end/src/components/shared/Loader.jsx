import { RoundedSpinner } from "@/assets/svg";

function Loader() {
  return (
    <div role="status" className="flex-center fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <RoundedSpinner/>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
export default Loader;
