import useSWRInfinite from "swr/infinite";
const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const useFetchPhotos = (url: string, searchTerm: string) => {
  const { data, error, setSize } = useSWRInfinite(
    (index) => `https://api.unsplash.com/${url}?page=${index+1}&per_page=30&client_id=${accessKey}&query=${searchTerm}`,
    fetcher,
  );
  return {
    photos: data,
    isLoading: !error && !data,
    isError: error,
    setSize: setSize,
  };
};
