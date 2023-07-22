let siteNameInput = document.getElementById("siteName");
let siteUrlInput = document.getElementById("siteUrl");

let allSites = [];
if (localStorage.getItem("allSites") != null) {
  allSites = JSON.parse(localStorage.getItem("allSites"));
  display(allSites);
}

function add() {
  if (found()) {
    if (validation()) {
      let site = {
        name: siteNameInput.value,
        url: siteUrlInput.value,
      };
      allSites.push(site);
      localStorage.setItem("allSites", JSON.stringify(allSites));
      clear();
      display(allSites);
    } else {
      document.getElementById("alert").style = "display:block;";
    }
  } else {
    window.alert("the site name is repeats");
  }
}
function found() {
  let x = 0;

  for (let i = 0; i < allSites.length; i++) {
    if (siteNameInput.value != allSites[i].name) {
      x++;
    }
  }
  if (x == allSites.length) {
    return true;
  } else {
    return false;
  }
}

function clear() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}
function display(key) {
  let cartona = "";
  let j;
  for (let i = 0; i < key.length; i++) {
    j = i + 1;
    cartona += `               <tr>
    <td>${j}</td>
    <td>${allSites[i].name}</td>
    <td> <button onclick="visit(${i})" class="btn  btn-info"><i class="fa-regular fa-eye"></i> visit</button></td>
    <td> <button onclick="del(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> delete</button></td>
    <td> <button onclick="update(${i})" class="btn btn-info"><i class="fa-solid fa-pen-to-square"></i> update</button></td>
</tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;
}

function visit(indx) {
  window.location.href = allSites[indx].url;
}

function del(indx) {
  allSites.splice(indx, 1);
  localStorage.setItem("allSites", JSON.stringify(allSites));
  display(allSites);
}

function validation() {
  let validationName = /^[a-z]{3,}$/;
  let validationURL = /^(ftp|http|https):\/\/[^ "]+$/;

  return (
    validationName.test(siteNameInput.value) &&
    validationURL.test(siteUrlInput.value)
  );
}

function update(i) {
  siteNameInput.value = allSites[i].name;
  siteUrlInput.value = allSites[i].url;
  document.getElementById(
    "all"
  ).innerHTML = `                <button id="edit" onclick="edit(${i})" class="btn btn-submit">update</button>
`;
}

function edit(i) {
  allSites[i].name = siteNameInput.value;
  allSites[i].url = siteUrlInput.value;
  document.getElementById(
    "all"
  ).innerHTML = `<button id="add" onclick="add()" class="btn btn-submit">submit</button>
`;
  display(allSites);
  clear();
}

function search(v) {
  let cartona ="";
  for (let i = 0; i < allSites.length; i++) {
      let j =i;

    if (
      allSites[i].name.toLowerCase().trim().indexOf(v.toLowerCase().trim()) == 0
    ) {
      cartona += `
      <tr>
    <td>${j +=1 }</td>
    <td>${allSites[i].name}</td>
    <td> <button onclick="visit(${i})" class="btn  btn-info"><i class="fa-regular fa-eye"></i> visit</button></td>
    <td> <button onclick="del(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> delete</button></td>
    <td> <button onclick="update(${i})" class="btn btn-info"><i class="fa-solid fa-trash-can"></i> update</button></td>
</tr>
      `;
    }
  }
  document.getElementById("tbody").innerHTML = cartona;
  console.log(cartona);
}
