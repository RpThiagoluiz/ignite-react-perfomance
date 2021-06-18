import { useMemo } from "react";
import { List, AutoSizer, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>;
  onAddToWishList: (id: number) => void;
  totalPrice: number;
};

export const SearchResults = ({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) => {
  //Esse calculo, msm sendo simples ele chega a dobrar o tempo de execucao.
  //useMemo(() => {}, []) //msm dependencia que o useEffect recebe

  // const totalPrice = results.reduce((total, product) => {
  //   return Number(total) + Number(product.price);
  // }, 0);

  //igualdade referencia, comparar se as duas variaveis ocupam o msm lugar na memoria.
  //Caso eu tenho um novo component, que utilizara o totalPrice,
  //toda vez q o component for atualizado. Ele vai ocupar um novo espaco da memoria.

  //<Component totalprice={totalprice}/>

  //useMemo vai evitar que a variavel, sera renderizada novamente quando ela for passada para um component filho.

  // const totalPrice = useMemo(() => {
  //   //results sera a pendencia, porq o calculo depende dele, e ele é o fator externo que sera alterado.
  //   return results.reduce(
  //     (total, product) => Number(total) + Number(product.price),
  //     0
  //   );
  //   //Msm com o useMemo, passando a dependencia, ele ainda tem um custo de processamento
  //   // se sua dependencia foi alterada ou não.
  //   //trazer o calculo das informacoes quando vc ja pega aquele resultado.
  // }, [results]);

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    //return de um html para cada item
    //Style que vai determinar se o elemento vai estar visivel ou nao
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      {/* 
        List -< react-virtualized vai substituir o map.  
        AutoSizer - ele seta o tamanho automatico da tela,
        vc usa ele na height
        overscanRowCount - quantos itens que vc quer q deixe pre recarregado.
        rowCount - tamanho da lista
    
    
    
    */}

      <List
        height={300}
        rowHeight={60}
        width={300}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))} */}
    </div>
  );
};

//Totalprice
