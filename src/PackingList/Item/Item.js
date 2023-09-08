// item and OnDeleteItem prop passed down from Parent App() component.
export default function Item({item, onDeleteItem, onToggleItem}) {
    return (
      <li>
        <input 
          type="checkbox" 
            value={item.packed} 
              onChange={() => onToggleItem(item.id)}
        >
        </input>
        <span 
        style={item.packed 
          ? {textDecoration: "line-through"} 
          : {}}
        >
          {item.quantity} &nbsp; 
          {item.description}
        </span>
  
        {/* DO NOT FORGET to ACTUALLY call the function onDeleteItem only when the onClick event happens by placing it within '() =>' */}
        <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
      </li>
    )
  }