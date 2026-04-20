import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { User } from "../types/user";

export const useUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); 

  const fetchData = async () => {
    setLoading(true);

    const res = await getUsers({
      page,
      results: limit,
    });

    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return {
    data,
    loading,
    page,
    limit,
    setPage,
    setLimit,
  };
};