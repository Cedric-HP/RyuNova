import LoadingComponent from "./components/small_components/LoadingComponent";

export default function Loading() {
  return (
    <div className="global">
        <LoadingComponent type="orbital" size={200}/>
    </div>
  );
}