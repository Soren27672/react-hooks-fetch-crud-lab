import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
    .then(r => r.json())
    .then(json => {
      setQuestions([...json])
    })
  }, [])

  function addQuestion(question) {
    fetch(`http://localhost:4000/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    })
    .then(r => r.json())
    .then(postedQuestion => setQuestions(questions => [...questions,postedQuestion]));
  }

  function deleteQuestion(e,id) {
    e.preventDefault();
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(r => setQuestions(questions => {
      return questions.filter(question => question.id !== id)
    }));
  }

  function updateCorrectIndex(e,id,newIndex) {
    console.log(e,id,newIndex);
    e.preventDefault();
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex: newIndex})
    })
    .then(r => r.json)
    .then(udpatedQuestion => {
      setQuestions(questions => {
        return questions.map(question => {
          if (question.id === udpatedQuestion.id) return udpatedQuestion;
          return question;
        })
      })
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form"
      ? <QuestionForm handOff={addQuestion}/>
      : <QuestionList questions={questions} handleDelete={deleteQuestion} handleUpdate={updateCorrectIndex}/>}
    </main>
  );
}

export default App;
