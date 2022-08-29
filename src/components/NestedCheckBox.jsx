import { v4 as uuid } from "uuid";
export const NestedCheckBox = ({
  parentObj,
  parentIndex,
  toggleChildCheckBox,
  handleParentCheckBox,
}) => {
  const { parent, isParentChecked, childrens } = parentObj;

  return (
    <div className="nested-checkbox  mt-3">
      <div className="parents">
        <label className="parent text-lg flex font-bold items-center gap-2">
          <input
            type="checkbox"
            checked={isParentChecked}
            onChange={() => handleParentCheckBox(parentIndex)}
          />
          {parent}
        </label>
      </div>

      <div className="childrens ml-3">
        {childrens.map((child) => (
          <label
            key={uuid()}
            className="child flex items-center space-x-4 gap-2 m-2 ml-8"
          >
            <input
              type="checkbox"
              checked={child.isChildChecked}
              onChange={() => toggleChildCheckBox(parentIndex, child.name)}
            />
            {child.name}
          </label>
        ))}
      </div>
    </div>
  );
};
