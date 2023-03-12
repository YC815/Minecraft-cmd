import { useState } from "react";

export default function Home() {
  const [itemId, setItemId] = useState("");
  const [customName, setCustomName] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [nbtTags, setNbtTags] = useState(false);
  const [customNbtTagsKey, setCustomNbtTagsKey] = useState([]);
  const [customNbtTagsValue, setCustomNbtTagsValue] = useState([]);
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [command, setCommand] = useState("");

  const [nbtTagInputs, setNbtTagInputs] = useState([{ key: "", value: "" }]);
  const customNbtTags = customNbtTagsKey
    .reduce(
      (acc, key, index) => `${acc}${key}:${customNbtTagsValue[index]},`,
      ""
    )
    .slice(0, -1); // remove trailing comma

  function generateCommand() {
    const customNbtTags = customNbtTagsKey
      .reduce(
        (acc, key, index) => `${acc}${key}:${customNbtTagsValue[index]},`,
        ""
      )
      .slice(0, -1);
    let fullCommand = `/give ${target} ${itemId}`;
    console.log("customNbtTags: ", customNbtTags);
    if (customNbtTags.length > 0) {
      if (customNbtTags) {
        fullCommand += ` tag:{${customNbtTags}}`;
      }
    }

    if (customName) {
      fullCommand += ` display:{Name:'[{"text":"","italic":false},{"text":"${customName}"}]',`;
    }
    if (customDescription) {
      fullCommand += ` Lore:['[{"text":"","italic":false},{"text":"${customDescription}"}]']},`;
    }
    if (amount) {
      fullCommand += ` ${amount}`;
    }
    setCommand(fullCommand);
  }

  function handleNbtTagInputChange(index, key, value) {
    console.log("index:", index, " key: ", key, " value: ", value);
    if (key === "") {
      /* const value = newInputs.map(({ value }) => value); */
      setCustomNbtTagsValue((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = value;
      });
    } else if (value === "") {
      setCustomNbtTagsKey((prevKey) => {
        const updatedKey = [...prevKey];
        updatedKey[index] = key;
      });
    }
    const newInputs = [...nbtTagInputs];
    newInputs[index] = { key, value };

    setCustomNbtTagsKey(newKeys);
  }

  function addNbtTagInput() {
    setNbtTagInputs([...nbtTagInputs, { key: "", value: "" }]);
  }

  function removeNbtTagInput(index) {
    const newInputs = [...nbtTagInputs];
    newInputs.splice(index, 1);
    setNbtTagInputs(newInputs);
  }

  function handleNbtTags() {
    setNbtTags(!nbtTags);
  }

  function copyToClipboard() {
    const commandInput = document.querySelector("textarea");
    commandInput.select();
    document.execCommand("copy");
  }

  return (
    <div>
      <div>
        <label>物品ID</label>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
      </div>
      <div>
        <label>自訂名稱</label>
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
      </div>
      <div>
        <label>自訂介紹</label>
        <input
          type="text"
          value={customDescription}
          onChange={(e) => setCustomDescription(e.target.value)}
        />
      </div>
      <div>
        <label>自訂NBT Tags</label>
        <button onClick={handleNbtTags}>{nbtTags ? "隱藏" : "顯示"}</button>

        {nbtTags && (
          <div>
            {nbtTagInputs.map(({ key, value }, index) => (
              <div key={index}>
                <input
                  type="text"
                  /* value={key} */
                  onChange={(e) =>
                    handleNbtTagInputChange(index, e.target.value, "")
                  }
                />
                <input
                  type="text"
                  /* value={value} */
                  onChange={(e) =>
                    handleNbtTagInputChange(index, "", e.target.value)
                  }
                />
                <button onClick={() => removeNbtTagInput(index)}>移除</button>
              </div>
            ))}
            <button onClick={addNbtTagInput}>新增NBT標籤</button>
          </div>
        )}
      </div>
      <div>
        <label>給予對象</label>
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </div>
      <div>
        <label>數量</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={generateCommand}>生成</button>
      <button onClick={copyToClipboard}>複製</button>
      {command && <textarea value={command} readOnly />}
    </div>
  );
}
