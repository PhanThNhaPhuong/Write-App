
const submit = document.querySelector("#submit");
var id;

submit.addEventListener("click", submitDoc);

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    if (id) {
        var listDocs = JSON.parse(sessionStorage.getItem("listDoc")) || {};
        var doc = listDocs[id];
        document.getElementById("title").value = doc.title;
        CKEDITOR.on('instanceReady', function() {
            CKEDITOR.instances.content.setData(doc.content);
        });
    }
};

function submitDoc() {
    var title = document.getElementsByClassName("title")[0].value;

    if (!title) {
        alert('Please add title!'); 
        return;
    }

    var data = CKEDITOR.instances.content.getData();
    var listDocs = JSON.parse(sessionStorage.getItem("listDoc")) || {};
    const d = new Date();
    const date = d.toLocaleDateString('vi-VI') + " " + d.toLocaleTimeString('vi-VI');

    var doc = {
        title: title,
        content: data,
        date: date
    }
    var key = d * 1;
    
    listDocs[key] = doc;
    var jsonData = JSON.stringify(doc);

    if (id) delete listDocs[id];
    sessionStorage.setItem("listDoc", JSON.stringify(listDocs));
    //luu local
    history.back();
}






