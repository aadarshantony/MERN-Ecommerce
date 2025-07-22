
import Category from './Category'
import Price from './Price'
import Size from './Size'

const FilterMain = ({ isFilterOpen }) => {
    return (
        <aside className={`border-1 border-gray-200 shadow-md w-64 overflow-scroll h-screen bg-white md:shadow-xl ${isFilterOpen ? 'max-lg:absolute' : 'max-lg:hidden'}`}>
            <div className='border-b-1 p-4 border-b-gray-200'>
                <h2 className='text-xl font-bold'>Filter</h2>
            </div>
            <Category categoryName={"Category"} categoryList={["Mens Wear", "Womens Wear", "Kids Wear"]} />
            <Category categoryName={"Sub Category"} categoryList={["Tops", "Shirts", "Jackets", "Pants", "Skirts"]} />
            <Price />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Size />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />
            <Category categoryName={"Brands"} categoryList={["GUCCI", "Zara", " H&M", "Forever21"]} />

        </aside>
    )
}

export default FilterMain