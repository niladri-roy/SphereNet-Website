import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/auth/admin-auth`
        );

        if (response.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setOk(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false); 
    }
  }, [auth?.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {ok && <Outlet />}
      {!ok && <div>Unauthorized</div>}
    </>
  );
}
