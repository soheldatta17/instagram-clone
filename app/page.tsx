import FeedPost from "@/components/FeedPost";
import Stories from "@/components/Stories";
import Suggestions from "@/components/Suggestions";

export default function Home() {
  return (
    <div className="flex justify-center gap-8 px-4 mx-auto max-w-7xl">
      <div className="w-full max-w-[600px]">
        <Stories />
        <FeedPost
          username="sarah.designs"
          avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
          caption="Just finished this amazing project! 🎨 #design #creativity"
          likes={1234}
          timestamp="2h"
        />
        <FeedPost
          username="travel.globe"
          avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
          image="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          caption="Paradise found 🌴 #travel #wanderlust"
          likes={2468}
          timestamp="4h"
        />
      </div>
      <div className="hidden lg:block w-[320px] flex-shrink-0">
        <Suggestions />
      </div>
    </div>
  );
}