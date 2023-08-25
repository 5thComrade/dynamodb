import LottieAnimation from "@/components/custom/LottieAnimation";
import loadingAnimation from "../../public/loading.json";

export default function Loading() {
  return (
    <div className="absolute inset-x-0 top-0 z-50 flex min-h-screen w-screen items-center justify-center bg-black opacity-30">
      <div className="mx-auto h-48 w-48">
        <LottieAnimation animationData={loadingAnimation} />
      </div>
    </div>
  );
}
