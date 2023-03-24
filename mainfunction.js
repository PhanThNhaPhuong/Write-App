const container = document.getElementById('doc-cards');
container.innerHTML = returnCards();

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
    'data:text/plain;charset=utf-8, ' + encodeURIComponent(note.content)
  );
  const filename = note.title + '.html';
  element.setAttribute('download', filename);
  document.body.appendChild(element);

  element.click();
  
}

function remove(id) {
  var noteStorage = JSON.parse(sessionStorage.getItem("listDoc")) || {};
  if (noteStorage[id]) {
    delete noteStorage[id];
    sessionStorage.setItem("listDoc", JSON.stringify(noteStorage));
    location.reload();
  }
}
