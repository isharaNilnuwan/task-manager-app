import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "./authService";

export const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = getAccessToken();
      if (!token) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) return <p>Loading...</p>;

    return <Component {...props} />;
  };
};
