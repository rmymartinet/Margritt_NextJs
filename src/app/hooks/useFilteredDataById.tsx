import { useFilteredData } from "./useFilteredData";

export default function useFilteredDataById(id: string) {
  const { data } = useFilteredData();
  return data.find((item) => item.id === id);
}
