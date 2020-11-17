import React from "react";
import Header from "./header";
import Footer from "./footer";
import notes from "../note";
import Note from "./note";

const App = () => {
  return (
    <div>
      <Header />
      <Footer />
      {notes.map((lanota) => (
        <Note key={lanota.key} title={lanota.title} content={lanota.content} />
      ))}
    </div>
  );
};

export default App;
