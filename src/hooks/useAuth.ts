import { useFindMeQuery } from "@/graphql/generated/output";
import { useEffect, useState, useRef } from "react";

export function useAuth() {
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const forcedExitRef = useRef(false);

  const {
    data: userData,
    error: userError,
    loading: userLoading,
    refetch: refetchUser,
  } = useFindMeQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (userLoading) {
      setIsAuthLoading(true);
      return;
    }

    if (userData?.FindMe?.user) {
      setIsAuthentificated(true);
    } else {
      setIsAuthentificated(false);
    }

    setIsAuthLoading(false);
  }, [userData, userLoading]);

  const refetch = async () => {
    forcedExitRef.current = false;
    await refetchUser();
  };

  const auth = () => {
    forcedExitRef.current = false;
    setIsAuthentificated(true);
  };

  const exit = async () => {
    forcedExitRef.current = true;
    setIsAuthentificated(false);
    setIsAuthLoading(false);

    // Очистим кэш и повторно вызовем FindMe
    await refetchUser();
  };

  return {
    isAuthentificated,
    isAuthLoading,
    auth,
    exit,
    refetch,
  };
}
