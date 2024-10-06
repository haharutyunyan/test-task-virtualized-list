import { UnsplashPhoto } from "@/app/types";
import PhotoDetails from "@/app/components/PhotoDetails";

interface PhotoPageProps {
  params: { id: string };
}

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

async function fetchPhoto(id: string): Promise<UnsplashPhoto> {
  const res = await fetch(
    `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch photo");
  }

  return res.json();
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const photo = await fetchPhoto(params.id);

  return <PhotoDetails photo={photo} />;
};

export default PhotoPage;
