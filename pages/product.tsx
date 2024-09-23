import { useState } from "react"

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("")
  const [isStock, setIsStock] = useState(false)

  return (
    <div>
      <SearchBar
        filterText={filterText}
        isStock={isStock}
        onFilterTextChange={setFilterText}
        onStockChange={setIsStock}
      />
      <ProductTable products={products} filterText={filterText} isStock={isStock} />
    </div>
  )
}

function SearchBar({ filterText, isStock, onFilterTextChange, onStockChange }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={isStock}
          onChange={(e) => onStockChange(e.target.checked)}
        />
        &nbsp; Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products, filterText, isStock }) {
  const categoryMap = new Map()
  const rows = []

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) < 0) {
      return
    }

    if (isStock && !product.stocked) {
      return
    }

    const hasCategory = categoryMap.get(product.category)
    if (!hasCategory) {
      rows.push(<ProductCategory category={product.category} key={product.category} />)
    }
    rows.push(<ProductRow product={product} key={product.name} />)
    categoryMap.set(product.category, 1)
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function ProductCategory({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  )
}

function ProductRow({ product }) {
  return (
    <tr>
      <td
        style={{
          color: product.stocked ? null : "red",
        }}
      >
        {product.name}
      </td>
      <td>{product.price}</td>
    </tr>
  )
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
]

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />
}
