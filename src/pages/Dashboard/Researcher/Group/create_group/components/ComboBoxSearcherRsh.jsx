import { useCombobox } from "downshift";
import React, { useEffect, useState } from "react";
const ComboBox = ({ loadedResearcherList, selectedItem, setSelectedItem }) => {
  const [items, setItems] = useState(loadedResearcherList);
  const rshTemp = loadedResearcherList;
  console.log(rshTemp);
  console.log(items);
  console.log(loadedResearcherList.length);
  // useEffect(() => {
  //   console.log(selectedItem);
  // }, [selectedItem]);
  function getBooksFilter(inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return function booksFilter(book) {
      return (
        !inputValue ||
        book.student_id.toLowerCase().includes(lowerCasedInputValue) ||
        book.firstname.toLowerCase().includes(lowerCasedInputValue) ||
        book.lastname.toLowerCase().includes(lowerCasedInputValue)
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
      setItems(loadedResearcherList.filter(getBooksFilter(inputValue)));
    },
    items,
    itemToString(item) {
      return item ? item?.student_id : "";
    },
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      setSelectedItem(newSelectedItem),
  });

  return (
    <div>
      <div className="w-72 flex flex-col gap-1">
        {/* <label className="w-fit" {...getLabelProps()}>
          เลือกนักศึกษา
        </label> */}
        <div className="flex shadow-sm bg-white gap-0.5">
          <input
            {...getInputProps({})}
            placeholder="รหัสนักศึกษา"
            className="w-full p-1.5"
            onClick={() => setItems(loadedResearcherList)}
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
        className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 
          ${!(isOpen && items?.length) && "hidden"}
          `}
        {...getMenuProps()}
      >
        {isOpen &&
          items
            .sort((a, b) => a.id - b.id)
            .map((item, index) => (
              <li
                className={`${highlightedIndex === index && "bg-blue-300"} ${
                  selectedItem === item && "font-bold"
                } py-2 px-3 shadow-sm flex flex-col`}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item?.student_id}</span>
                <span className="text-sm text-gray-700">
                  {item?.firstname} {item?.lastname}
                </span>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ComboBox;
