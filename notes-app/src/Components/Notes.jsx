import React, { useEffect, useState } from "react";
import CreateNote from "./CreateNote";
import { v4 as uuid } from "uuid";
import Note from "./Note";

const Notes = () => {
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editToggle, setEditToggle] = useState(null);
  const saveHandler = () => {
    if (editToggle) {
      setNotes(
        notes.map((note) =>
          note.id === editToggle ? { ...notes, text: inputText } : note
        )
      );
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
        },
      ]);
    }

    setInputText("");
    setEditToggle(null);
  };

  const deleteHandler = (id) => {
    const finalNotesData = notes.filter(n=>n.id!==id)
    setNotes(finalNotesData)
  }

  const editHandler = (id, text) => {
    setEditToggle(id);
    setInputText(text);
  };

  useEffect(() => {
    const data = localStorage.getItem("Notes");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setNotes(parsedData);
        } else {
          setNotes([]);
          localStorage.removeItem("Notes"); 
        }
      } catch (error) {
        console.error("Error parsing notes from localStorage:", error);
        setNotes([]);
      }
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("Notes", JSON.stringify(notes));
    }
  }, [notes]);
  return (
    <div className="notes">
      {notes.map((note) =>
        editToggle === note.id ? (
          <CreateNote
            inputText={inputText}
            setInputText={setInputText}
            saveHandler={saveHandler}
          />
        ) : (
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              editHandler={editHandler}
              deleteHandler = {deleteHandler}
          />
        )
      )}
      {!notes.some((note) => editToggle === note.id) && (
        <CreateNote
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
        />
      )}
    </div>
  );
};

export default Notes;
