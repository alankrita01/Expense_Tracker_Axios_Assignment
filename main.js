function saveToLocalStorage(event){
  event.preventDefault();

  const expenseValue = event.target.exp.value;
  const description  = event.target.descr.value;
  const category = event.target.categ.value;

  const obj = {
    expenseValue : expenseValue,
    description : description,
    category : category
  }

  axios.post("https://crudcrud.com/api/2d9f43b081ec41068517a713409d4eea/expenseTrackerData",obj)
    .then((response) => {
      showOnScreen(response.data)
    })
    .catch((err) => {
      document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>";
      console.log(err);
    })
}

window.addEventListener("DOMContentLoaded", () => {

  axios.get("https://crudcrud.com/api/2d9f43b081ec41068517a713409d4eea/expenseTrackerData")
    .then((response) => {
      console.log(response);
      for(var i=0; i<response.data.length; i++){
        showOnScreen(response.data[i])
      }
    })
    .catch((error) => {
      console.log(error)
    })
})


function showOnScreen(user){
  const parentNode=document.getElementById('listOfUser');

  const childHTML =`<li id=${user._id}> ${user.expenseValue} - ${user.description} - ${user.category} <button style="border-color:green;" onclick=editUserDeatils('${user.description}','${user.saveToLocalStorage}','${user._id}')>Edit Expense</button> <button style="border-color:red;" onclick=deleteUser('${user._id}')>Delete Expense</button> </li>`;

  parentNode.innerHTML =parentNode.innerHTML + childHTML;

 

}

//edit user

function editUserDeatils(descr,categ,userId){

  console.log(descr,categ,userId)
  document.getElementById('descr').value=descr;
  //document.getElementById('exp').value=exp;
  document.getElementById('categ').value=categ;

  deleteUser(userId);
}

//delete user

function deleteUser(userId){

  axios
    .delete(`https://crudcrud.com/api/2d9f43b081ec41068517a713409d4eea/expenseTrackerData/${userId}`)
    .then((response) => {
      removeUserFromScreen(userId)
    })
    .catch((error) => {
      console.log(error)
    })
}

//remove user

function removeUserFromScreen(descr){
  const parentNode = document.getElementById('listOfUser');
  const childNodeToBeDeleted = document.getElementById(descr);

  if(childNodeToBeDeleted){
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

