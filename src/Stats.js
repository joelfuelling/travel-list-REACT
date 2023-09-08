export default function Stats({items}) {
    if (!items.length) return <p className="stats">Start adding some items!</p>
  
    let numItems = items.length
    let numPacked = items.filter((item) => item.packed)
    const percentage =  Number((numPacked.length /numItems * 100).toFixed(0))
    return (
      <>
      <footer className="stats">
        <em>  
        You have {numItems} items on your list, and you've packed {percentage === 100 ? `everything. Well done!` : ` ${numPacked.length}
        (${percentage}%).`}
        </em>
        </footer>
      </>
    )
  }