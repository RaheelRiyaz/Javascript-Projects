const addBtn = document.querySelector(".add-btn");
const saveBtn = document.querySelector(".save-btn");
const cardBody = document.querySelector(".card-body");
let initialId = 0;

addBtn.addEventListener("click", (e) => {
  initialId++;
  cardBody.insertAdjacentHTML(
    "beforeend",
    `
  <div class="input-row">
  <div class="form-floating mb-3">
  <input type="email" class="form-control email" id="email-${initialId}" placeholder="name@example.com" oninput="removeEmailMessage(event)">
  <label for="email-${initialId}">Email address</label>
  <p class="collapse text-danger">Please fill the email field</p>
</div>
<div class="form-floating mb-3">
  <input type="password" class="form-control pass" id="pass-${initialId}" placeholder="Password" oninput="removePasswordMessage(event)">
  <label for="pass-${initialId}">Password</label>
  <p class="collapse text-danger">Please fill the password field</p>
</div>
<button class="btn btn-sm btn-danger" onclick="deleteRow(event)">-</button>
</div>
`
  );
});

saveBtn.addEventListener("click", (e) => {
  const emails = document.querySelectorAll(".email");
  const passwords = document.querySelectorAll(".pass");
  const list = [];
  const filteredEmails = [...emails].filter((_) => !_.value);
  const filteredPasswords = [...passwords].filter((_) => !_.value);

  filteredEmails.forEach((_) => {
    _.nextElementSibling.nextElementSibling.classList.remove("collapse");
  });
  filteredPasswords.forEach((_) => {
    _.nextElementSibling.nextElementSibling.classList.remove("collapse");
  });

  if (filteredEmails.length > 0 || filteredPasswords.length > 0) return;

  for (const email of emails) {
    list.push({
      email: email.value,
    });
  }
  passwords.forEach((pass, i) => {
    list[i].password = pass.value;
  });

  console.log(list);
});

function deleteRow(e) {
  cardBody.removeChild(e.target.parentElement);
}

function removeEmailMessage(e) {
  const targetClass = e.target.nextElementSibling.nextElementSibling.classList;
  if (e.target.value) targetClass.add("collapse");
  else targetClass.remove("collapse");
}
function removePasswordMessage(e) {
  const targetClass = e.target.nextElementSibling.nextElementSibling.classList;
  if (e.target.value) targetClass.add("collapse");
  else targetClass.remove("collapse");
}
