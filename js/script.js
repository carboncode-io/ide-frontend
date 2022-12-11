const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer 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',
    'content-type': 'application/json'
  }
};

listbugs()
function dir(m) {

  // m being the dir
  for (let i in m) {
    // file
    if (m[i].type === "file") {

      var name = m[i].name;
      var ul = "filetree";
      document.getElementById(ul).innerHTML += `<li class="file" onclick="setCodeValue('${m[i].url}')"> ${name} </li>`;




    }
    // folder
    else if (m[i].type === "dir") {

      document.getElementById("filetree").innerHTML += `<li>
     <span onclick="caret('folder_${m[i].sha}')"class="caret file">
${m[i].name.split("/").slice(-1)[0]}
</span>
      <ul id="folder_${m[i].sha}" class="nested">
    
      </ul></li>`
      var url = m[i].url;
      fetch(url, options)
        .then(response => response.json())
        .then(response => s_dir(m[i].name, "folder_" + m[i].sha, response, url, m[i].path))
        .catch(err => console.error(err));

    }

  }
}
function s_dir(name, ul, m, url1, path) {



  for (let i = 0; i < m.length; i++) {
    // file
    if (m[i].type === "file") {

      var name = m[i].name;
      document.getElementById(ul).innerHTML += `<li class="file" onclick="setCodeValue('${m[i].url}')"> ${name}</li>`;



    }
    // folder
    else if (m[i].type === "dir") {



      document.getElementById(ul).innerHTML += `<li>
     <span onclick="caret('folder_${m[i].sha}')" class="caret file">
${m[i].name.split("/").slice(-1)[0]}
</span>
      <ul id="folder_${m[i].sha}" class="nested">
    
      </ul></li>`
      var url = m[i].url;



      fetch(url, options)
        .then(response => response.json())
        .then(response => s_dir(m[i].name, "folder_" + m[i].sha, response, url, m[i].path))
        .catch(err => console.error(m[i].name, url));

    }

  }

}

function listbugs() {
  fetch("https://api.github.com/repos/firescrypt/editor-1/issues", options)
    .then(response => response.json())
    .then(response => {

      response.forEach(function(n) {
        document.getElementById("issue-logger").innerHTML +=
          `<div class="issue-log"><h2>${n.title}</h2><p>${n.body}</p></div>`
      })
    })
    .catch(err => console.error(err));
}



function caret(m) {
  var x = document.getElementById(m);
  x.classList.toggle("active");
  event.target.classList.toggle("caret-down");
}

function setCodeValue(m) {

  const list = document.getElementById("editor");
  list.style.display = "block";

  fetch(m, options)
    .then(response => response.json())
    .then(response => setv(response))
    .catch(err => console.error(err));

}



require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs' } });
window.MonacoEnvironment = { getWorkerUrl: () => proxy };
let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@0.8.3/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@0.8.3/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));
require(["vs/editor/editor.main"], function() {



  window.editor = monaco.editor.create(document.getElementById('editor'), {

    language: 'text',
    theme: 'vs-dark',
    minimap: {
      enabled: true
    }
  })

})

var tabs = {};
var c_tab = [];

function setv(r) {

  window.filename = r.name;
  window.filepath = r.path;
  window.filesha = r.sha;
  window.fileurl = r.url;
  window.filevalue = window.atob(r.content);
  var value = window.atob(r.content);

  if(!document.getElementById("tab_"+r.path)){
      document.getElementById("tabs").innerHTML += `<div onclick="setTab('${r.path}')" id="tab_${r.path}">${r.path} <span class="material-icons" onclick="closetab('tab_${r.path}')" style="margin-left:10px;">
close
</span></div>`
     // console.log("c")
    if(! c_tab.includes(r.path)){
        c_tab.push(r.path)
    }
    
  
   }  
  if (tabs.hasOwnProperty(r.path)) {
    window.editor.setModel(tabs[r.path]);
    
  }
  else {
    const model = monaco.editor.createModel(value, undefined);
    // console.log(model)
    window.editor.setModel(model);
    tabs[r.path] = model
    
   
  }


}
function r_arr(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
function setTab(m){
  window.editor.setModel(tabs[m]);

}
function closetab(m) {
  

  if(c_tab.length > 2){
   var len = c_tab[c_tab.indexOf(m.split("tab_")[1]) - 1]
   console.log(len)
    setTab(len)
    document.getElementById(m).remove();
    console.log(r_arr(c_tab, m.split("tab_")[1]));
  }
  else{
    if(c_tab.length === 1){
      var len = c_tab[0]
      console.log(len)
      setTab(len)
      document.getElementById(m).remove();
      console.log(r_arr(c_tab, m.split("tab_")[1]));
    }    
  }
    
}

window.c_files = {};



function changeval(m) {
  var r = window.c_files[m].a;
  var o = window.filevalue;
  console.log(r, o)
  review(r, o)
}
function commit() {
  var message = prompt("commit-message");

  var path = window.filepath;
  var sha = window.filesha;
  var content = window.btoa(window.editor.getValue())

  const options = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer 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',
      'content-type': 'application/json'
    },
    body: JSON.stringify(
      {
        "message": message,
        "content": content,
        "sha": sha
      }
    )
  };

  fetch('https://api.github.com/repos/firescrypt/editor-1/contents/' + path, options)
    .then(response => response.json())
    .then(response => alert("succes"))
    .catch(err => console.error(err));


}
function issue() {
  var title = document.getElementById("issue-title").value;
  var body = document.getElementById("issue-body").value;
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer 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',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "title": title,
      "body": body
    })
  };

  fetch('https://api.github.com/repos/firescrypt/editor-1/issues', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
function edit_code() {
  const list = document.getElementById("editor");
  const list1 = document.getElementById("terminal");
  if (list1.style.display === "none") {
    list1.style.display = "block";
    let jklm = document.getElementById("terminal-icon").classList;
    jklm.add("navactive");
  }
  else {
    list1.style.display = "none";
    let jklm = document.getElementById("terminal-icon").classList;
    jklm.remove("navactive");
  }

}