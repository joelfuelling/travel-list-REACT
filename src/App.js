
import { useState } from "react"
import Header from './Header'
import Form from "./Form"
import PackingList from "./PackingList/PackingList"
import Stats from "./Stats"

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false},
  { id: 2, description: "Socks", quantity: 12, packed: false},
  { id: 3, description: "Charger", quantity: 1, packed: false}
]

export default function App() {
  // 'items' state has been lifted out of the form component and placed here since the PackingList component and
  // Default 'items' state is the InitialItems array declared above. 
  const [items, setItems] = useState(initialItems)
  function handleAddItems(item) {
    // Create a copy of the items array and add the new item
    setItems(items => [...items, item])
  }

  function handleDeleteItems(id) {
    setItems(items=> 
      items.filter((item) =>
       item.id !== id
       ))
  }

  function handleToggleItem(id) {
    setItems(items => 
      items.map((item) => 
        item.id === id 
        // Create a new object with the item.packed status set to the opposite of it's current status.
        ? {...item, packed: !item.packed} 
        : item
    ))
  }

  function handleClearList() {
    // Create the condition 'confirmed' using .confirm()
    const confirmed = window.confirm('Are you sure you sure you want to delete all items?')
    if(confirmed) setItems([])
    return
  }

  return (
    // Below we pass props to each component (onAdditems, items, onDeleteItem), all of which has a function or 'prop' (ie., items) declared in this component.
    <>
    <div className="app">
    <Header />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
    <Stats items={items}/>
    </div>
    </>
  )
}


