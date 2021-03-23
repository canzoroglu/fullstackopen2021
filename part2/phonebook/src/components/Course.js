import React from 'react'

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.reduce((acc, item) => acc + item.exercises, 0)
    return <p><strong>Number of exercises {sum}</strong></p>
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
      {course.map(c => {
        return (
          <div key={c.id}>
            <Header name={c.name} />
            <Content course={c.parts} />
            <Total course={c.parts} />
          </div>
        )
      })}
      </>
    )
  }

  export default Course