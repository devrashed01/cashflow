import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const UserContext = createContext<UserContextType | undefined>(undefined);
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const users = localStorage.getItem("users");
    if (users) {
      setUsers(JSON.parse(users));
    }
  }, []);

  useEffect(() => {
    if (users.length === 0) return;
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUpdateUser = (user: Omit<User, "id"> & { id?: User["id"] }) => {
    if (user?.id) {
      setUsers(users.map((u) => (u.id === user.id ? { ...u, ...user } : u)));
    } else {
      setUsers([...users, { ...user, id: uuid() }]);
    }
  };

  const deleteUser = (id: User["id"]) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUpdateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
