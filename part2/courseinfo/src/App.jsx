const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((prop) => <Part key={prop.exercises} part={prop} />)}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  let total = 0;
  for (let i = 0; i < props.course.parts.length; i++) {
    total += props.course.parts[i].exercises
  }
  return <p><strong>total of {total} exercises</strong></p>
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App;