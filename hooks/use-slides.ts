import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSlides() {
  const { data, error, isLoading, mutate } = useSWR('/api/slides', fetcher);

  return {
    slides: data,
    isLoading,
    isError: error,
    mutate,
  };
}