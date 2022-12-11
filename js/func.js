let jkl = document.getElementById("file-icon").classList;
jkl.add("navactive");
let jklm = document.getElementById("terminal-icon").classList;
jklm.add("navactive");

function findNav(){
    let icon_list3 = document.getElementById("setting-icon").classList;
icon_list3.remove("navactive");
document.getElementById('setting-nav').style.display="none";
   let icon_list = document.getElementById("find-icon").classList;
  icon_list.add("navactive");
   let icon_list1 = document.getElementById("file-icon").classList;
  icon_list1.remove("navactive");
 let icon_list2 = document.getElementById("issue-icon").classList;
icon_list2.remove("navactive");
document.getElementById('issue-nav').style.display="none";  
  document.getElementById('filetree').style.display="none";
  document.getElementById('find-nav').style.display="block";
}
function fileNav(){
    let icon_list3 = document.getElementById("setting-icon").classList;
icon_list3.remove("navactive");
document.getElementById('setting-nav').style.display="none";
   let icon_list = document.getElementById("file-icon").classList;
  icon_list.add("navactive");
   let icon_list1 = document.getElementById("find-icon").classList;
  icon_list1.remove("navactive");
let icon_list2 = document.getElementById("issue-icon").classList;
icon_list2.remove("navactive");
document.getElementById('issue-nav').style.display="none";
  document.getElementById('filetree').style.display="block";
  document.getElementById('find-nav').style.display="none";
}
function issueNav(){
   let icon_list = document.getElementById("file-icon").classList;
  icon_list.remove("navactive");
   let icon_list1 = document.getElementById("find-icon").classList;
icon_list1.remove("navactive");
let icon_list2 = document.getElementById("issue-icon").classList;
icon_list2.add("navactive");
  let icon_list3 = document.getElementById("setting-icon").classList;
icon_list3.remove("navactive");
document.getElementById('setting-nav').style.display="none";
document.getElementById('filetree').style.display="none";
document.getElementById('find-nav').style.display="none";
document.getElementById('issue-nav').style.display="block"; 
}
function settingNav(){
   let icon_list = document.getElementById("file-icon").classList;
  icon_list.remove("navactive");
   let icon_list1 = document.getElementById("find-icon").classList;
icon_list1.remove("navactive");
let icon_list2 = document.getElementById("issue-icon").classList;
icon_list2.remove("navactive");
  let icon_list3 = document.getElementById("setting-icon").classList;
icon_list3.add("navactive");
document.getElementById('filetree').style.display="none";
document.getElementById('find-nav').style.display="none";
document.getElementById('issue-nav').style.display="none"; 
document.getElementById('setting-nav').style.display="block"; 
}
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function find(){
  window.editor.setScrollPosition({scrollTop: 0});
  var text = document.getElementById("find-input").value;
  var arr = window.editor.getModel().findMatches(text);
document.getElementById("find-logger").innerHTML = ''
  // window.editor.revealLine(lin);
  // window.editor.setPosition({column: col, lineNumber: lin});
  // window.editor.setSelection(arr.range);
 for(let m in arr){
   var i = arr[m];
     var col = i.range.startColumn;
  var lin = i.range.startLineNumber;
   console.log(i.range)
    document.getElementById("find-logger").innerHTML += `<div class="find-log" onclick='goto(${JSON.stringify(i.range)})'><i>${text}</i>
    <br><i>Line Number:  </i>${lin}<br><i>Column number: 
 ${col}</i></div>`
 }
}
function goto(r){
window.editor.revealLine(r.startLineNumber);
  window.editor.setPosition({column: r.startColumn, lineNumber: r.startLineNumber});
  window.editor.setSelection(r);
}
function support(){
  window.open("https://docs.hoppscotch.io/")
}
function apply(){
  var wordwrap = document.getElementById("wordwrap-picker").checked;
  var minimap = document.getElementById("minimap-picker").checked;
  var language = document.getElementById("language-picker").value;
  var size = document.getElementById("size-picker").value;
  console.log(wordwrap , minimap , language , size)
}