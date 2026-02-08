import LoadingComponent from "../components/small_components/LoadingComponent";

export default function Loading() {
  return (
    <div className="global">
        <LoadingComponent type="orbital" size={200}/>
        <LoadingComponent type="black-hole" size={100}/>
        <LoadingComponent type="simple" size={26}/>
    </div>
  );
}