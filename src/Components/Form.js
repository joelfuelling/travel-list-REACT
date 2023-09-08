import { useState } from "react"

export default function Form({onAddItems}) {
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
          <select onChange={(e) => 
          setQuantity(Number(e.target.value))}
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