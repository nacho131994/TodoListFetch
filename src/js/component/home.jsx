import React from "react";
import { useState, useEffect } from "react";


const Home = () => {

	const [newItem, setNewItem] = useState("");
	const [items, setItems] = useState([])
 
	//POST
// const createUser = () =>{
// 	return(
// 	fetch('https://assets.breatheco.de/apis/fake/todos/user/nacho_mm', {
//     method: "POST",
//     body: JSON.stringify(items),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//   .then(resp => console.log("OK"))
//   .catch(error => console.log("ERROR")));
// }
// useEffect(createUser, [])
//GET
const getItems = () => {
	return(
		fetch('https://assets.breatheco.de/apis/fake/todos/user/nacho_mm')
		.then((res) => res.json())
		.then((res) => setItems(res))
		.catch(eror =>console.log(eror))
	)
	
}
useEffect(getItems, []);

//PUT

const putItems = (newArray) => {
	
	return(
		fetch('https://assets.breatheco.de/apis/fake/todos/user/nacho_mm', {
		method: "PUT",
		body: JSON.stringify(newArray),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then((res) => getItems(res))
	.then(resp => console.log(" OK"))
	.catch(error => console.log("ERROR")) 
	)
} 
useEffect(putItems, [])


const addItem = () => {
	if (!newItem) {
		alert("Add an item");
		return
	}
	const item = {
		id: Math.floor(Math.random() * 1000),
		value: newItem
	}
	setItems(oldList => [...oldList, item]);
	setNewItem("")
}

const deleteItem = (id) => {
	const newArray = items.filter(item => item.id !== id);
	setItems(newArray);
};

const handleKeyDown = (e) => {
	if(e.key === "Enter") {
		addItem();
	}
}


const deleteAll = () => {
	if (items.length === 0) {

		alert("There are no tasks to delete");

	}
	else {
		setItems([])
	}

	;
}

	
	return (
		<div className="wrapper">
			<div className="title">
				<p>To Do List <i className="fa-solid fa-check"></i></p>
			</div>
			<div className="container">
				<div className="input">
					<input className="input" type="text" placeholder="Add a new task" value={newItem} onChange={e => setNewItem(e.target.value)} />
					<button id="addButton"type="button" className="btn btn-success ms-2" onClick={() => addItem()}>Add</button>
					
				</div>
				<div className="tasklist">
					<ul className="list">
						{items.map(item => {
							console.log(item)
							return (
								<li key={item.id} className="listItem" >{item.label} {item.value}<p className="deleteItem" onClick={() => deleteItem(item.id)} ><i id="trash" className="fa-solid fa-trash"></i></p></li>
							)
						})}
						
					</ul>
				</div>
				<div className="counter">
					<p className="remaining">{items.length === 0 ?
						"Add a task" :
					`Tasks remaining: ${items.length}`}
					</p>
					<button id="deleteAllButton" type="button" className="btn btn-danger ms-2" onClick={deleteAll}>Delete all tasks</button>

				</div>
			</div>
		</div>

	);
};

export default Home;



