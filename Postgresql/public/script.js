const div = document.querySelector(".main");
const input = document.querySelector('input')
const btn = document.querySelector('.btn')

function getUsers(){
  console.log('here')
  div.innerHTML = '';
  console.log("here")
  let value = input.value;
  value = value.charAt(0).toUpperCase() + value.slice(1);
  console.log(value)
  const URL = `http://localhost:5000/person/${value}`
  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const table = document.createElement("table");
      div.appendChild(table)
      const columns = Object.keys(data[0]);
      columns.splice(0,1)
      console.log(columns)
      const header = document.createElement("tr")
  
      columns.forEach(name => {
        const column = document.createElement("th")
        column.innerHTML = name;
        header.appendChild(column)
      });
  
      table.appendChild(header)
  
      data.forEach(row => {
        const dataRow = document.createElement("tr");
        columns.forEach(name => {
          const td = document.createElement("td")
          td.innerHTML = row[name];
          dataRow.appendChild(td)
  
        });
        table.appendChild(dataRow)
    
      });
  
    })
    .catch((error) => {
      console.log(error);
    });
}


btn.onclick=(event)=>{
  getUsers();
  console.log(event)
}
window.onkeyup=(event)=>{
  console.log(event.keyCode)
  if(event.keyCode == '13') getUsers();
  if(event.keyCode == "32") {
    input.focus();
    input.select();
    // input.setSelectionRange(0,1);
    
  }
};

// POST for practice
// btn.onclick = () => {
//   console.log("in the event");
//   fetch("http://localhost:5000/monsters", {
//     method: "POST",
//     body: JSON.stringify({
//       title: "this is working",
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error));
// };
