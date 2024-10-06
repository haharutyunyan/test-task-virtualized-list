import useSWRInfinite from "swr/infinite";
const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const useFetchPhotos = () => {
  const { data, error, setSize, mutate } = useSWRInfinite(
    (index) => `https://api.unsplash.com/photos?page=${index+1}&per_page=30&client_id=${accessKey}`,
    fetcher,
  );
  return {
    photos: data,
    isLoading: !error && !data,
    isError: error,
    setSize: setSize,
    mutate: mutate
  };
};
