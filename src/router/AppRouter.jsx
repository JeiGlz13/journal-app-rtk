import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { JournalRoutes } from "../modules/journal/routes/JournalRoutes";
import { CheckingAuth } from "../components/CheckingAuth";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
