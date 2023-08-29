
import { useState } from "react"

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false},
  { id: 2, description: "Socks", quantity: 12, packed: true},
  { id: 3, description: "Charger", quantity: 1, packed: false}
]

export default function App() {
  const [items, setItems] = useState(initialItems)

  function handleAddItems(item) {
    // Create a copy of the items array and add the new item
    setItems(items => [...items, item])
  }

  function handleDeleteItems(id) {
    setItems(items=> items.filter((item) => item.id !== id))
  }
  return (
    <>
    <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItem={handleDeleteItems}/>
    <Stats />
    </div>
    </>
  )
}


function Logo() {
  return <h1>Far Away 🛫</h1>
}

function Form({onAddItems}) {
  // Controlled elements. using state over the DOM.
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  //% We need to pass the 'items' state out of this component (line below this purple comment) to the PackingList component... 
  //% 1 - We can't pass it as a prop because the form is not a parent component, but a sibling component - Data can only flow down the tree! - 
  //% 2 - Instead, we have to 'lift up state'. to do that, we move the items state into the closest common parent component (App), then...
  //% 3 - Pass the destructured props object (items) into the packingList component to receive the new state.
  //% 4 - 
  // const [items, setItems] = useState([])



  function handleSubmit(e) {
    e.preventDefault()
    // Guard Clause: If description is empty, just return.
    if(!description) return

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false  
    }
    onAddItems(newItem)
    setQuantity(1)
    setDescription('')
  }
  return (
    <>
    <form className="add-form" onSubmit={handleSubmit}> 
      <h3>What do you need for you 😻 trip?</h3>
        <select onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}>
          {/* Create an array with 20 indexes, then map it/fill it in with 1 through 20, using <option>s within the <select/> */}
          {Array.from(
            {length: 20}, 
            (_, i) => i + 1
            ).map((num) => 
          (
          <option 
            value={num} 
            key={num}>
            {num}
          </option> 
          )
          )}
        </select>
        {/* Whenever we TYPE/CHANGE the input field below, state is changed to reflect the value */}
        <input 
        type="text" 
        placeholder="Item..." 
        value={description} 
        onChange={
          (e) => 
          setDescription(e.target.value)
          } 
        />
          <button>Add</button>
    </form>
    </>
  )
}
function PackingList({ items, onDeleteItem }) {
  return (
    <>
    <div className="list"> 
      <ul>
        {items.map((item) => <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />)}
      </ul>
    </div>
    </>
  )
}

function Item({item, onDeleteItem}) {
  return (
    <li>
      <span>{item.quantity}</span>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
    </li>
  )
}
function Stats() {
  return (
    <>
    <footer className="stats">You have X items on your list, and you already packed x (X%)</footer>
    </>
  )
}