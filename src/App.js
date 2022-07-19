import "./App.css";
import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const useTodos = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleted = (id) => {
    const found = data.filter((d) => d.id === id);

    if (found.length <= 0) {
      alert("Error");
    }

    const foundComplete = {
      ...found[0],
    };

    const remainingData = data.filter((d) => d.id !== id).reverse();

    const response = [
      ...remainingData.slice(0, foundComplete.id),
      ...remainingData.slice(foundComplete.id + 1),
    ].reverse();

    setData(response);
  };

  const add = (newData) => {
    setData([newData, ...data]);
  };

  const complete = (id) => {
    const found = data.filter((d) => d.id === id);

    if (found.length <= 0) {
      alert("Error");
    }

    const foundComplete = {
      ...found[0],
      completed: !found[0].completed ? true : false,
    };

    const remainingData = data.filter((d) => d.id !== id);

    const response = [
      ...remainingData.slice(foundComplete.id + 1),
      foundComplete,
      ...remainingData.slice(0, foundComplete.id),
    ];

    setData(response);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        let d = json;
        d.reverse();
        setData(d.slice(0, 50));
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, add, isLoading, error, complete, deleted };
};

export const AppFC = () => {
  const { data, isLoading, error, add, complete, deleted } = useTodos();

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.length>0){
    const newTodo = {
      userId: 1,
      id: data.length + 1,
      title: text,
      completed: false,
    };
    add(newTodo);
    setText("");}
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something is wrong.</div>;
  }

  return (
    <div>
      <div className="App">
        <h2>To-Do List</h2>

        <br></br>
        <h4>Add a new task in the list</h4>
        <br></br>
        <form id="to-do-form" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              className="text1"
              placeholder="Enter the task here"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" id="text2" />
        </form>
        <br></br>
        <h4>Added task in to-do list</h4>
        <br></br>
        <div class="grid-container">
          {" "}
          {/* {data.slice(0, 50).map((item) => ( */}
          {!!data &&
            data.map((item, index) => (
              <div key={item.id} class="grid-item">
                <div class="sno"> {index + 1}.</div>
                <div class={!item.completed ? "differ" : "differs"}>
                  <div
                    class="info"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    Title: {item.title}
                    <div class="icon">
                      <BsCheckCircleFill
                        size="22px"
                        style={{ color: "#7AB530", left: "100%" }}
                      />
                    </div>
                  </div>{" "}
                  <hr></hr>
                  <div class="buttons">
                    <button
                      id={!item.completed ? "mark" : "completed"}
                      onClick={(e) => {
                        e.preventDefault();
                        complete(item.id);
                      }}
                    >
                      Mark as {!item.completed ? "Complete" : "Incomplete"}
                    </button>

                    <button
                      id="delete"
                      onClick={(e1) => {
                        e1.preventDefault();
                        deleted(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// class App extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       items: [],
//       DataisLoaded: false
//     };

//   }

//   componentDidMount() {
//     fetch(
//       "https://jsonplaceholder.typicode.com/todos")
//       .then((res) => res.json())
//       .then((json) => {
//         this.setState({
//           items: json,
//           DataisLoaded: true
//         });
//       })
//   }

//   render() {
//     const shoot = () => {
//       alert("Great Shot!");
//     }

//     const { DataisLoaded, items } = this.state;
//     if (!DataisLoaded) return <div>
//       <h1> Please wait some time.... </h1> </div>;

//     return (
//       <div className="App">
//         <centre><h2>To-Do List</h2></centre>
//         <br></br>
//         <h4>Add a new task in the list</h4>
//         <br></br>
//         <form id="to-do-form">
//           <label>
//             <input type="text" name="name" class="text1" placeholder="Enter the task here" />
//           </label>
//           <input type="submit" value="Submit" id="text2" />
//         </form>
//         <br></br>
//         <h4>Added task in to-do list</h4><br></br>

//         <div class="grid-container"> {

//           items.slice(0, 50).map((item) => (
//             <div class="grid-item">
//               <div class="sno"> {item.id}.</div>
//               <div class="differ"><div class="info">
//                 {/* User_Id: { item.userId},
//                     id: { item.id },  */}
//                 Title: {item.title}</div> <hr></hr>
//                 <div class="buttons">

//                   <button id="mark" onClick={shoot} >Mark as completed</button>

//                   <button id="delete">Delete</button>

//                 </div>
//               </div>
//             </div>
//           ))
//         }</div>
//       </div>
//     );
//   }
// }

// export default App;
