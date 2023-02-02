import React from "react";
import QuestionItem from './QuestionItem';

function QuestionList({ questions, handleDelete, handleUpdate }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => {
        return <QuestionItem
        question={question}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        key={question.id}/>
      })}</ul>
    </section>
  );
}

export default QuestionList;
