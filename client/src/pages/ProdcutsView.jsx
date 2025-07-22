import { useState } from "react"
import FilterMain from "../components/filter/FilterMain"
import ProductList from "../components/shoppingList/ProductList"

const ProdcutsView = () => {
  const [ filterOpen , setFilterOpen ] = useState(true);
  const handleFilterMenu = () => {
    setFilterOpen(prev => !prev)
  }
  return (
    <section className='min-h-screen max-w-screen-xl m-auto pt-32 mb-8 flex gap-1' >
      <FilterMain isFilterOpen={filterOpen} />
      <ProductList handleFilterMenu={handleFilterMenu} />
    </section>
  )
}

export default ProdcutsView