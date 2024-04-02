import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";
import { TransactionsContext } from "../../../contexts/transactions-context";
import { SearchFormContainer } from "./styles";

/**
 * Porque um componente renderiza?
 *  - Hooks changed (mudou estado, contexto, reducer...);
 *  - Props changed (mudou propriedades);
 *  - Parent rerendered (componente pai renderizou);
 *
 * Qual o fluxo de renderização?
 *  1. React recria o HTML da interface daquele componente
 *  2. Compara a versão do HTML recriada com a versão anterior
 *  3. SE mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo: utilizar apenas em interfaces complexas
 *  0. Hooks changed, Props changed (deep comparison)
 *  0.1. Comparar a versão anterior dos hooks e props
 *  0.2. SE mudou algo, ele vai permitir a nova renderização
 */

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
