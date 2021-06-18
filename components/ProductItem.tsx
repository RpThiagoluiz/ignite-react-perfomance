import { memo, useState, lazy } from "react";
import { AddProductToWishListProps } from "./AddProductToWishList";
import dynamic from "next/dynamic";
//import { AddProductToWishList } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    //!improtant aq tem q ser exportado como default
    //.then e pega somente o produto importado NAO estiver em default
    //como estamos utilizando type, precisamos exportar as props
    return import("./AddProductToWishList").then(
      (mod) => mod.AddProductToWishList
    );
  },
  {
    //Loading pode receber um component.
    loading: () => <span>Carregando....</span>,
  }
);

//Tambem consegue fazer isso para funcion que vao ser executada somente quando o usario clicar.

// async function shallowFormattedDate(){
//   //importando um pacote.
//   const {format} = await import('date-fns')
// //Assim vc importa somente quando for utilizar a funcao.
//   format()
// }

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishList: (id: number) => void;
};

//Doc , reconciliacao
// - Gerar uma nova versão do componente que precisa ser renderizado. Ela é guardada na memoria.
// - Comparar essa nova versão com a versão anterior ja salva na pagina
// - Se houver alterações , o React 'renderiza' essa nova versão em tela,
// No nosso caso ele cai no primeiro e no segundo.

//Sempre que o componente pai sofrer um fluxo de alteracao os components filhos tambem iram sofrer.
//useMemo, vai comprar antes de renderizar novamente o component filho.
//porq oq vai mudar veio das props do component pai
//memo relecebe um shallow compare - comparacao rasa
//verificar se tem igualdade, so que lembra q o JS quando compara obj e array sempre da false msm q seja igual
// ele faz igualdade referencial, ele vai buscar na memoria se estao no msm lugar.

//!important como estamos comparando obj, no memo tempos q enviar um segundo parametro.

export const ProductItem = memo(
  ({ product, onAddToWishList }: ProductItemProps) => {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

    return (
      <div>
        {product.title} - <strong>{product.priceFormatted}</strong>
        <button onClick={() => onAddToWishList(product.id)}>
          <button onClick={() => setIsAddingToWishlist(true)}>
            Adicionar aos favoritos
          </button>

          {/* Lasing Loading, carregamento lento.
      Isso aqui so vai acontecer, se o usuario clicar no button 
      Carregar o codigo do component somente quando precisar
      os bottoes quando clico no input e eles parecem.

      de dentro do proprio react importa o lazy
      no next temos o dinamyc
      

      
      */}

          {isAddingToWishlist && (
            <AddProductToWishList
              onAddToWishList={() => {
                onAddToWishList(product.id);
              }}
              onRequestClose={() => setIsAddingToWishlist(false)}
            />
          )}
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);

// function ProductItemComponent ({ product }: ProductItemProps)  {
//   return (
//     (
//       <div>
//         {product.title} - <strong>{product.price}</strong>
//       </div>
//     )
//   )
// }
// export const ProductItem = memo(ProductItemComponent, (prevProps,nextProps) => {
//oq satisfaz para refazer esse component.
//returnar oq vai indentificar isso
//custar mais processamento contudo vai comprar os dados passados
//return  Object.is(prevProps, nextProps)

//})
