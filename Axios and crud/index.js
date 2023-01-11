
function saveToCrudStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.useremail.value;
    const userphonenumber = event.target.userphonenumber.value;
    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);
    // localStorage.setItem('userphonenumber', userphonenumber);

    const obj= {
        name,
        email,
        userphonenumber,
    }
    localStorage.setItem(obj.email, JSON.stringify(obj));
    showUserOnScreen(obj);
    axios
    .post(
      "https://crudcrud.com/api/20ae5e9e021d411dbe76d89c09faad02/AppointmentApp",
      obj
    )
    .then((response) => {
        showUserOnScreen(response.data);
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/20ae5e9e021d411dbe76d89c09faad02/AppointmentApp")
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));
});

function showUserOnScreen(user) {
  document.getElementById("usernameInputTag").value = "";
  document.getElementById("useremailInputTag").value = "";
  document.getElementById("userphonenumberInputTag").value = "";

  const d = document.getElementById("ul");
  const li = `<li id="${user._id}"> ${user.name} - ${user.email} - ${user.userphoneumber} 
    <button onclick = "editUser('${user.email}','${user.name}','${user.userphoneumber}','${user._id}')"> Edit </button> 
    <button   onclick = "deleteUser('${user._id}')"> Delete </button> 
     </li>`;

  d.innerHTML = d.innerHTML + li;
}
 
function showUserOnScreen(obj){
    const parentElem = document.getElementById('list of items')
    const childElem = document.createElement('li')
    childElem.textContent = obj.name + '-' + obj.email + '-' + obj.userphonenumber

        const deleteButton = document.createElement('input')
        deleteButton.type = "button"
        deleteButton.value = 'delete'
        deleteButton.onclick = () => {

            localStorage.removeItem(obj.email)
            parentElem.removeChild(childElem)
        }
        function deleteUser(userId) {
            axios
              .delete(
                `https://crudcrud.com/api/1d3f85bd354b4187bc86dd4c560c5fbb/AppointmentApp/${userId}`
              )
              .then((response) => {
                removeUserfromScreen(userId);
              });
          }

        const editButton = document.createElement('input')
        editButton.type = "button"
        editButton.value = 'edit'
        editButton.onclick = () => {

            localStorage.removeItem(obj.email)
            parentElem.removeChild(childElem)
            document.getElementById('usernameInputTag').value = obj.name;
            document.getElementById('useremailInputTag').value = obj.email
            document.getElementById('userphonenumberInputTag').value = obj.userphonenumber
        }



    childElem.appendChild(deleteButton)
    childElem.appendChild(editButton)
    parentElem.appendChild(childElem)
}