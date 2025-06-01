// "use client";
// import { createContext, useEffect, useState, ReactNode } from "react";
// import { authService } from "@/lib/authService";

// interface AuthContextProps {
//   isAuthenticated: boolean;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextProps | undefined>(
//   undefined
// );

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = document.cookie.includes("accessToken=");
//     setIsAuthenticated(token);
//   }, []);

//   const logout = () => {
//     authService.logout();
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
