import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getFilteredProducts } from "../services/productServices";
import FilterMain from "../components/filter/FilterMain";
import ProductList from "../components/shoppingList/ProductList";

const ProdcutsView = () => {
  const [filterOpen, setFilterOpen] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState(null);

  const handleFilterMenu = () => setFilterOpen(prev => !prev);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", appliedFilters],
    queryFn: () => appliedFilters ? getFilteredProducts(appliedFilters) : getProducts(),
  });

  return (
    <section className='min-h-screen max-w-screen-xl m-auto pt-32 mb-8 flex gap-1'>
      <FilterMain
        isFilterOpen={filterOpen}
        onFilterApply={setAppliedFilters} // now only sends filters here
      />
      <ProductList
        handleFilterMenu={handleFilterMenu}
        products={data || []}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </section>
  );
}

export default ProdcutsView;
