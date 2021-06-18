import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
  results: Array<{ id: Number; price: Number; title: String }>;
};

export const SearchResults = ({ results }: SearchResultsProps) => (
  <div>
    {results.map((product) => (
      <ProductItem product={product} />
    ))}
  </div>
);
