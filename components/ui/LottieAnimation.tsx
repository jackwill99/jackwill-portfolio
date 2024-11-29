import Lottie from "react-lottie";

const LottieAnimation: React.FC<{ copied: boolean; animationData: any }> = ({
  copied,
  animationData,
}: {
  copied: boolean;
  animationData: any;
}) => (
  <Lottie
    options={{
      loop: copied,
      autoplay: copied,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }}
    height={200}
    width={400}
  />
);
export default LottieAnimation;
