const content = document.querySelector(".content");


function updateContent(e) {
  const file = e.target.files[0];
  if (file.type === "text/plain") {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      content.innerText = e.target.result;
    };
  } else fireSwal("Please select text file")
}

function fireSwal(text) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "error",
    title: text,
  });
}
