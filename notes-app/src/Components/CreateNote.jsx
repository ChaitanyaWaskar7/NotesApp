import React from "react";
import './notes.css'
const CreateNote = ({ inputText, setInputText, saveHandler }) => {
  const charLimit = 100;
  const charLength = charLimit - inputText.length;
  return (
    <div className="note">
      <textarea
        name=""
        id=""
        cols={10}
        rows={5}
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        placeholder="Type.."
        maxLength={100}
      ></textarea>
      <div className="note_footer">
        <span className="label">{charLength} Left</span>
        <button
          className="note_save"
          onClick={saveHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
