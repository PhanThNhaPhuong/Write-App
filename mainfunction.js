const container = document.getElementById('doc-cards');
const deleted1 = document.getElementById('delete-btn2');
const cancel_bt = document.getElementById('cancel-btn2');
container.innerHTML = returnCards();
deleted1.addEventListener("click", Deletefunction);
cancel_bt.addEventListener("click", Canceled);

function returnCards() {
  var listDocs = JSON.parse(sessionStorage.getItem("listDoc")) || {};

  var innerContent = '';


  for (var doc in listDocs) {
    innerContent = innerContent.concat(
      `
    <div class="column" id="${doc}">
      <div class="card">
        <a href="index.html">${listDocs[doc].title}</a>
        <div>&emsp;&emsp;${listDocs[doc].date}</div>
        <div class="note-header__right icon-list">
        <a class="link-item edit" onClick="edit(${doc})">
          <i class="fas fa-edit icon-item edit"></i>
        </a>
        <a class="link-item download" onClick="downLoad(${doc})">
          <i class="fas fa-arrow-alt-circle-down icon-item download"></i>
        </a>
        <a class="link-item remove" onClick="remove(${doc})">
          <i class="fas fa-times-circle icon-item remove"></i>
        </a>
        </div>
      </div>
    </div>
`);
  }

  innerContent = innerContent.concat("</div>");
  return innerContent;
}

function edit(id) {
  window.location.href = 'index.html?id=' + id;
}

function downLoad(id) {
  var noteStorage = JSON.parse(sessionStorage.getItem("listDoc")) || {};
  const note = noteStorage[id];
  if (!note) {
    throw new Error('file not found');
  }

  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8, ' + encodeURIComponent(note.title) + 
    encodeURIComponent(note.content) + encodeURIComponent(note.date)
  );
  const filename = note.title + '.doc';
  element.setAttribute('download', filename);
  document.body.appendChild(element);

  element.click();
  
}
function Deletefunction() {
  var id_index = document.getElementById("alert-overlay").getAttribute("note_id");
  console.log('delete')
  var noteStorage = JSON.parse(sessionStorage.getItem("listDoc")) || {};
  delete noteStorage[id_index];
  sessionStorage.setItem("listDoc", JSON.stringify(noteStorage));
  location.reload();
  document.getElementById("alert-overlay").classList.add('hide')
}
 
function Canceled () {
  location.reload;
  document.getElementById("alert-overlay").classList.add('hide')
}
// var deleted = document.getElementsByClassName("delete-btn2");
// var canceled = document.getElementsByClassName("cancel-btn2");

// deleted.onclick = Deletefunction
// canceled.onclick = function Canceled () {
//   location.reload;
//   document.getElementById("alert-overlay").classList.add('hide')
// }
// 
function remove(id) {

  var noteStorage = JSON.parse(sessionStorage.getItem("listDoc")) || {};
  if (noteStorage[id]) {
    // const deleted1 = document.getElementById('delete-btn2');
    // container.innerHTML = returnCards();
    // deleted1.addEventListener("click", Deletefunction(id));
        document.getElementById("alert-overlay").classList.remove('hide');
        document.getElementById("alert-overlay").setAttribute("note_id", id);
        
    // document.getElementsByClassName("content-wrapper").innerHTML= noteStorage[id].title;
    // element = document.getElementById("alert-overlay");
    // element.setAttribute(
    //   'display',
    //   'show'
    // )
    //document.getElementById("alert-overlay").style.display = "show";
    // const alertRemoveHtml = `<div class="alert-overlay">
    //         <div class="alert-wrapper">
    //           <div class="content-wrapper">
    //             <div class="content-wrapper">${noteStorage[id].title}</div>
    //             <div class="last-update-wrapper">${noteStorage[id].content}</div>
    //           </div>
    //           <div class="button-box">
    //             <button  class="delete-btn2">Delete</button>
    //             <button class="cancel-btn2">Cancel</button>
    //           </div>
    //         </div>
    //       </div>
    //       </div>`
    // // document.body.insertAdjacentHTML('afterbegin', alertRemoveHtml)
    
    // var deleted = document.getElementsByClassName("delete-btn2");
    // var canceled = document.getElementsByClassName("cancel-btn2");

    // deleted.onclick = Deletefunction(id);
    // canceled.onclick = Canceled();
    
  }
}

