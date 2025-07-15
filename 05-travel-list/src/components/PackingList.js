import { useState } from "react";
import Item  from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [shortBy, setShortBy] = useState("input");

  let shortedItems;

  if (shortBy === "input") shortedItems = items;

  if (shortBy === "description")
    shortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (shortBy === "packed")
    shortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {shortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={shortBy} onChange={(e) => setShortBy(e.target.value)}>
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by the description</option>
          <option value="packed">Sort by the packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
