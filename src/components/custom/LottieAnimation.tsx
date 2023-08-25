"use client";

import Lottie, { type LottieComponentProps } from "lottie-react";

export default function LottieAnimation(props: LottieComponentProps) {
  return <Lottie animationData={props.animationData} />;
}
