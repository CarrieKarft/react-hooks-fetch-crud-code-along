import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
// import { set } from "msw/lib/types/context";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items") 
    .then(r => r.json())
    .then(items => setItems(items))
  }, []);

  function handleAddNewItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleUpdatingItem(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    });
    setItems(updatedItems);
  }

  function handleDeletingItem(deletedItem) {
    console.log(deletedItem)
    const updatedItems = items.filter(item => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddNewItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onUpdateItem={handleUpdatingItem} key={item.id} item={item} onDeletedItem={handleDeletingItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
