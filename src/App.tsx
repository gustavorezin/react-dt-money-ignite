import { ThemeProvider } from "styled-components";
import { Transactions } from "./pages/transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { TransactionsProvider } from "./contexts/transactions-context";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  );
}
