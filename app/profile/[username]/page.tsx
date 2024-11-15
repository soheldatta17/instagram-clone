import ProfileContent from "@/components/ProfileContent";
import { profiles } from "@/lib/data";

export const generateStaticParams = () => {
  return Object.keys(profiles).map((username) => ({
    username,
  }));
};

export default function ProfilePage({ params }: { params: { username: string } }) {
  return <ProfileContent username={params.username} />;
}