import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import "animate.css";

export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
