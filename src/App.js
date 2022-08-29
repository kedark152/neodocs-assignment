/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { NestedCheckBox } from "./components/NestedCheckBox";
import { useState, useEffect } from "react";
import { data } from "./data";

function App() {
  const [checklistData, setChecklistData] = useState(data);

  const toggleParentCheckBox = (parentIndex) => {
    setChecklistData((prev) =>
      prev.map((item, index) =>
        index === parentIndex
          ? { ...item, isParentChecked: !item.isParentChecked }
          : item
      )
    );
  };
  const toggleChildCheckBox = (parentIndex, childName) => {
    setChecklistData((prev) =>
      prev.map((item, index) =>
        index === parentIndex
          ? {
              ...item,
              childrens: item.childrens.map((child) =>
                child.name === childName
                  ? {
                      ...child,
                      isChildChecked: !child.isChildChecked,
                    }
                  : child
              ),
            }
          : item
      )
    );
  };

  const handleParentCheckBox = (parentIndex) => {
    setChecklistData((prev) =>
      prev.map((item, index) =>
        index === parentIndex
          ? {
              ...item,
              childrens: item.childrens.map((child) => ({
                ...child,
                isChildChecked: !item.isParentChecked,
              })),
            }
          : item
      )
    );
  };

  const ifAllChildrensChecked = () => {
    checklistData.forEach((parent, index) => {
      let countTrue = 0;
      parent.childrens.map((child) =>
        child.isChildChecked ? countTrue++ : countTrue
      );
      if (parent.childrens.length === countTrue && !parent.isParentChecked) {
        toggleParentCheckBox(index);
      }
      if (countTrue < parent.childrens.length && parent.isParentChecked) {
        toggleParentCheckBox(index);
      }
    });
  };

  useEffect(() => {
    ifAllChildrensChecked();
  }, [checklistData]);

  return (
    <div className="App">
      <div className="container-main flex justify-center mt-4 gap-2">
        <div className="checkbox-container border-2 border-black p-2">
          <h1 className="text-2xl font-bold"> Nested Checkbox</h1>

          {checklistData.map((parentObj, index) => (
            <NestedCheckBox
              key={index}
              parentObj={parentObj}
              parentIndex={index}
              toggleChildCheckBox={toggleChildCheckBox}
              handleParentCheckBox={handleParentCheckBox}
            />
          ))}
        </div>
        <div className="result-container border-2 border-black w-1/3 p-2 ">
          <h1 className="text-3xl font-bold text-center">Result</h1>
          {checklistData.map((item, index) => (
            <ul key={index} className="text-2xl flex flex-col ml-4">
              <li className="font-bold">➤ {item.parent}</li>
              <ul>
                {item.childrens.filter((child) => child.isChildChecked)
                  .length === 0 && <li>No Students under {item.parent}</li>}
                {item.childrens.map(
                  (child, index) =>
                    child.isChildChecked && (
                      <li key={index} className="ml-3">
                        ▪️ {child.name}
                      </li>
                    )
                )}
              </ul>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
