import React from "react";
import { redirect } from "react-router-dom";
import { useCombobox } from "downshift";

const Dashboard = () => {
  const books = [
    { author: "Harper Lee", title: "To Kill a Mockingbird" },
    { author: "Lev Tolstoy", title: "War and Peace" },
    { author: "Fyodor Dostoyevsy", title: "The Idiot" },
    { author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
    { author: "George Orwell", title: "1984" },
    { author: "Jane Austen", title: "Pride and Prejudice" },
    { author: "Marcus Aurelius", title: "Meditations" },
    { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov" },
    { author: "Lev Tolstoy", title: "Anna Karenina" },
    { author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
  ];
  const [items, setItems] = React.useState(books);
  const [selectedItem, setSelectedItem] = React.useState(null);
  function getBooksFilter(inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return function booksFilter(book) {
      return (
        !inputValue ||
        book.title.toLowerCase().includes(lowerCasedInputValue) ||
        book.author.toLowerCase().includes(lowerCasedInputValue)
      );
    };
  }
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(books.filter(getBooksFilter(inputValue)));
    },
    items,
    itemToString(item) {
      return item ? item.title : "";
    },
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      setSelectedItem(newSelectedItem),
  });

  return (
    <div>
      <div className="w-72 flex flex-col gap-1">
        <label className="w-fit" {...getLabelProps()}>
          Choose your favorite book:
        </label>
        <div className="flex shadow-sm bg-white gap-0.5">
          <input
            placeholder="Best book ever"
            className="w-full p-1.5"
            {...getInputProps()}
          />
          <button
            aria-label="toggle menu"
            className="px-2"
            type="button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </div>
      <ul
        className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 ${
          !(isOpen && items.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            // className={
            //   ${highlightedIndex === index && "bg-blue-300"} ${selectedItem === item && "font-bold"}
            //   "py-2 px-3 shadow-sm flex flex-col"
            // }
            <li
              className={`${highlightedIndex === index && "bg-blue-300"} ${
                selectedItem === item && "font-bold"
              } py-2 px-3 shadow-sm flex flex-col`}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.title}</span>
              <span className="text-sm text-gray-700">{item.author}</span>
            </li>
          ))}
      </ul>
      <p className="font-semibold">
        {selectedItem
          ? `You have selected ${selectedItem.title} by ${selectedItem.author}.`
          : "Select a book!"}
      </p>
    </div>
  );
};

export default Dashboard;

export function checkAuth() {
  // console.log("start check");
  const response = fetch("http://localhost:8080/auth/check", {
    method: "get",
  });

  const data = response.json();

  if (data.isAuth === false) {
    return redirect("/login");
  }
}
