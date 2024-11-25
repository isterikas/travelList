import { useState } from "react";

const Form = () => {
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [itemName, setItemName] = useState("");
  const [itemslist, setItemslist] = useState([]);
  const [sort, setSort] = useState("order");
  const [checkedstate, setCheckedState] = useState(0);

  const itemNumberHandler = (e) => {
    e.preventDefault();
    if (itemName === "") {
      return;
    }
    e.target.reset();
    const arrayItem = { quantity: numberOfItems, itName: itemName };
    setItemslist([...itemslist, arrayItem]);
    setItemName("");
  };

  return (
    <>
      <div className="form-field">
        <form onSubmit={itemNumberHandler} id="form">
          <label htmlFor="quantity" className="form-item-margin">
            What do you need for your 😍 trip?
          </label>
          <select
            name="quantity"
            id="quantity"
            className="form-item-padding"
            onChange={(e) => setNumberOfItems(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <input
            type="text"
            className="form-item-margin"
            onChange={(e) => setItemName(e.target.value)}
          />
          <button type="submit" className="form-item-margin">
            ADD
          </button>
        </form>
      </div>

      <div className="output-field">
        {sort === "order"
          ? itemslist.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={item}
                    id={item}
                    onChange={(e) =>
                      setCheckedState((prev) => {
                        if (e.target.checked) {
                          return prev + 1;
                        } else {
                          return prev - 1;
                        }
                      })
                    }
                  />
                  <label htmlFor="checkbox">
                    {" " + item.quantity + " "}
                    {item.itName}
                  </label>
                </div>
              );
            })
          : sort === "alpha"
          ? itemslist
              .toSorted((a, b) => a.itName.localeCompare(b.itName))
              .map((item, index) => {
                return (
                  <div key={index}>
                    <input type="checkbox" name={item} id={item} />
                    <label htmlFor="checkbox">
                      {" " + item.quantity + " "}
                      {item.itName}
                    </label>
                  </div>
                );
              })
          : itemslist
              .toSorted((a, b) => b.quantity - a.quantity)
              .map((item, index) => {
                return (
                  <div key={index}>
                    <input type="checkbox" name={item} id={item} />
                    <label htmlFor="checkbox">
                      {" " + item.quantity + " "}
                      {item.itName}
                    </label>
                  </div>
                );
              })}
      </div>
      <div className="second-output-field">
        <select name="" id="" onChange={(e) => setSort(e.target.value)}>
          <option value="order">Sort by input order</option>
          <option value="alpha">Sort alphabetically</option>
          <option value="quan">Sort by quantity</option>
        </select>
        <button
          onClick={() => {
            setItemslist([]);
            setCheckedState(0);
          }}
        >
          CLEAR LIST
        </button>
      </div>
      <div className="footer-field">
        <p>
          🧳 You have {itemslist.length}{" "}
          {itemslist.length === 1 ? "item" : "items"} in your list, and you
          already packed {checkedstate} (
          {checkedstate
            ? Math.round((100 * checkedstate) / itemslist.length) + "%"
            : "0%"}
          )
        </p>
      </div>
    </>
  );
};

export default Form;
