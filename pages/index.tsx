import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[];
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    //Vc cria a funcao para ela nao
    //precisar ser reconstruida toda vez, para cada component
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product) => {
      return {
        id: product.id,
        title: product.id,
        priceFormatted: formatter.format(product.price),
      };
    });

    setResults({
      totalPrice,
      data: products,
      //data, ao invez de salvar os dados crus e modificalos depois,
      //vc ja modifica eles durante a chamada, para ele ja entrarem formatados.
    });
  };

  //Add product to favorite List
  //Toda vez q esse component for alterado, todas as funcoes vao ser recriadas do zero.
  //nao é porq uma funcao, sera recriada, ou o tamanho que sera pesado para recarregar
  //utilizamos somente pelo valor dela, digamos q essa funcao for passa para outro component

  // const addToWishList = async (id: number) => {
  //   console.log(id);
  // };

  //transforma ela
  const addToWishList = useCallback(async (id: number) => {
    //Aq oq eu preciso vem de baixo, entao eu nao preciso passar nda no array de dependencias.
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  );
}
