import React, { createContext, useState, useEffect } from 'react';
import { fetchUsersData } from '../services/api'; // Adjust the path as needed

interface UsersContextProps {
  users: any[];
  loading: boolean;
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  setPage: (page: number) => void;
  totalUsers: number;
  setTotalUsers: (totalUsers: number) => void;
  fetchUsers: (filter?: string) => void;
}

// Create the context with an initial undefined value
export const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(100);

  useEffect(() => {
    fetchUsers();
  }, [limit, page]);

  const fetchUsers = async (filter?: string ) => {
    setLoading(true);
    // const { filterBy } = options || {};
    fetchUsersData(filter) // Fetch data for users, adjust the logic accordingly
    .then((response) => {
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }

  return (
    <UsersContext.Provider value={{ users, loading, limit, setLimit, page, setPage, totalUsers, setTotalUsers, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
