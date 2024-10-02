import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../types/dataTypes";

export function useItemsFiltered(filter?: string) {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Item[]>("/api/get");
        let filteredData = response.data;
        if (filter) {
          filteredData = response.data.filter(
            (item) => item.category === filter,
          );
        }
        setData(filteredData);
      } catch (error) {
        console.log(error);
        console.error("Error fetching items");
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  return { data, loading };
}