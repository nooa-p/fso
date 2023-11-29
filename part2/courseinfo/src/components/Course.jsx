const Header = (props) => {
    return <h2>{props.course.name}</h2>
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
  const total = props.course.parts.reduce((a, c) => a + c.exercises, 0)
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

  export default Course;