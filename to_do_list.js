"use strict";

class ToDoList {
  constructor() {
    console.log('START: this: ', this);
    this.group_index = 1;
    this.task_initializer_index = 1;
    this.task_index = 1;
  }

  createGroup(json_group=null) {
    console.log('TEST "this" 1:', this);

    let drag_source;

    let div_for_group = document.createElement('div');
    let div_for_group_id = 'div_for_group_' + this.group_index;
    div_for_group.id = div_for_group_id;
    div_for_group.className = 'Div_For_Group';

    let group_ul = document.createElement('ul');
    let group_placeholder = "Group...";
    let group_ul_id = 'group_ul_' + this.group_index;
    group_ul.id = group_ul_id;
    this.group_index++;
    group_ul.className = 'Group_ul';

    $( function() {
      console.log('JJJJJJJJJJJJJJJJJJJ');
      $( ".Group_ul" ).sortable();
      $( ".Group_ul" ).disableSelection();
    } );

    let li = document.createElement("li");

    let group_input_field = document.createElement("input");
    group_input_field.className = 'group_input';
    if (json_group && json_group['name']) {
      group_input_field.value = json_group['name'];
    }
    group_input_field.placeholder = group_placeholder;

    li.appendChild(group_input_field);

    let span_remove_group = document.createElement("SPAN");
    let text_remove_group = document.createTextNode("Remove Group");
    span_remove_group.className = "remove_group";
    span_remove_group.appendChild(text_remove_group);
    span_remove_group.onclick = function() {
      remove_element(div_for_group);
    }
    li.appendChild(span_remove_group);

    group_ul.appendChild(li);

    li = document.createElement("li");
    let task_initializer = document.createElement("input");
    let task_initializer_id = "task_initializer_" + this.task_initializer_index;
    task_initializer.id = task_initializer_id;
    task_initializer.type = "text";
    task_initializer.placeholder = "Instert Task Name Here";
    task_initializer.className = "task_initializer";

    let add_task_button = document.createElement("input");
    let add_task_button_id = "add_task_button_" + this.task_initializer_index;
    add_task_button.id = add_task_button_id;
    add_task_button.type = "button";
    add_task_button.value = "Add Task";
    add_task_button.className = "add_task_button";

    // let move_task_up_button = document.createElement("input");
    // let move_task_up_button_id = "move_task_up_button_" + this.task_initializer_index;
    // move_task_up_button.id = move_task_up_button_id;
    // move_task_up_button.type = "button";
    // move_task_up_button.value = "Move Task To Previous Group";
    // move_task_up_button.className = "move_task_up_button";

    let move_task_down_button = document.createElement("input");
    let move_task_down_button_id = "move_task_down_button_" + this.task_initializer_index;
    move_task_down_button.id = move_task_down_button_id;
    move_task_down_button.type = "button";
    move_task_down_button.value = "Move Task To Next Group";
    move_task_down_button.className = "move_task_down_button";
    move_task_down_button.style.visibility = "hidden";

    this.task_initializer_index++;

    li.appendChild(task_initializer);
    li.appendChild(add_task_button);
    li.appendChild(move_task_down_button);
    group_ul.appendChild(li);
    // div_for_group.appendChild(move_task_up_button);
    div_for_group.appendChild(group_ul);
    // div_for_group.appendChild(move_task_down_button);

    div_for_group.ondragover = function() {
      console.log('ondragover')
      draggingOver(event);
    };
    div_for_group.ondrop = function() {
      console.log('ondrop')
      dropped(event);
    };

    document.getElementById("main_div").appendChild(div_for_group);

    move_task_down_button.onclick = function() {
      let task_li_id = div_for_group.getElementsByClassName('Task_Li')[0].id;
      let from_group_ul_id = group_ul_id;
      let group_uls = document.getElementsByClassName('Group_ul');
      let to_group_ul_id = group_uls[Array.prototype.indexOf.call(group_uls, group_ul) + 1].id;

      let from_group = document.getElementById(from_group_ul_id);
      let to_group = document.getElementById(to_group_ul_id);
      let task = document.getElementById(task_li_id);
      console.log('document: ', document);
      console.log('from_group_ul_id: ', from_group_ul_id);
      console.log('from_group: ', from_group);
      console.log('to_group_ul_id: ', to_group_ul_id);
      console.log('to_group: ', to_group);
      console.log('task_li_id: ', task_li_id);
      console.log('task: ', task);
      moveTask(task_li_id, from_group_ul_id, to_group_ul_id );
    }

    // -------------------------- drag and drop ---------------------------------------
    function dragStarted(e) {
      drag_source = e.target;
      console.log('event on dragStarted', e);
      console.log('drag_source on dragStarted', drag_source);
      e.dataTransfer.setData("text", e.target.id);
      e.dataTransfer.effectAllowed = "move";
    }

    function draggingOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    }

    function dropped(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('drag_source on dropped', drag_source);
      let data = e.dataTransfer.getData("text");
      group_ul.appendChild(document.getElementById(data));
    }
    // --------------------------------------------------------------------------------

    let obj = this;
    function enterKeyPressAddTask(event, group_ul_id, task_initializer_id, obj) {
      const x = event.which || event.keyCode;
      if (x === 13) {
        obj.createTask(group_ul_id, task_initializer_id, obj);
      }
    }
    console.log('TEST "this" 2:', this);

    add_task_button.onclick = function() {
      obj.createTask(group_ul_id, task_initializer_id, obj)
    };
    task_initializer.onkeypress = function() {
      enterKeyPressAddTask(event, group_ul_id, task_initializer_id, obj)
    };

    if (json_group) {
      json_group['tasks'].forEach(function(element) {
        // element is task name
        obj.createTask(group_ul_id, task_initializer_id, obj, element);
      });
    }

    function moveTask(task_li_id, from_group_ul_id, to_group_ul_id) {
      let from_group = document.getElementById(from_group_ul_id);
      let to_group = document.getElementById(to_group_ul_id);
      let task = document.getElementById(task_li_id);
      to_group.appendChild(task);
      remove_element(from_group.getElementById(task_li_id));
      // let list = document.getElementsByClassName('Div_For_Group');
      // let list = document.getElementById("aaa")
      // console.log('LIST', list)
    }
  }

  createTask(group_ul_id, task_initializer_id, obj, name='') {

    console.log('group_ul_id, task_initializer_id:',
                group_ul_id, task_initializer_id);

    let li = document.createElement("li");
    let task_li_id = 'task_li_' + obj.task_index;
    li.id = task_li_id
    li.className = 'Task_Li'
    li.draggable="true";

    li.ondragstart = function() {
      console.log('ondragstart')
      dragStarted(event);
    };

    let task_name;
    if (name) {
      task_name = name;
    } else {
      task_name = document.getElementById(task_initializer_id).value;
    }

    // let name = document.createTextNode(task_name);
    let task_input = document.createElement("input");
    task_input.id = 'task_' + obj.task_index
    task_input.className = 'task_input';
    // task_input.value = task_name
    task_input.placeholder = 'Task' + obj.task_index;
    if (task_name) {
      task_input.value = task_name;
    }

    li.appendChild(task_input);
    document.getElementById(group_ul_id).appendChild(li);
    document.getElementById(task_initializer_id).value = "";

    let span_remove_task = document.createElement("SPAN");
    let text_remove_task = document.createTextNode("Remove Task");
    span_remove_task.className = "remove_task";
    span_remove_task.appendChild(text_remove_task);
    span_remove_task.onclick = function() {
      obj.remove_element(li);
    }
    li.appendChild(span_remove_task);

    let move_task_down_button = li.parentElement.getElementsByClassName('move_task_down_button')[0];
    obj.changeMoveTaskButtonVisibility(move_task_down_button);

    obj.task_index++;
  }

  remove_element(element) {
    // ---- two lines of code snippets below do the same thing (parentElement/parentNode) ---

    let parent = element.parentElement;
    // let parent = element.parentNode;

    // ----------------------------------------------------------------------------

    if (element.className === 'Task_Li') {
      const move_task_down_button = element.parentElement.getElementsByClassName('move_task_down_button')[0];
      parent.removeChild(element);
      this.changeMoveTaskButtonVisibility(move_task_down_button);
    } else {
      parent.removeChild(element);
    }
  }

  changeMoveTaskButtonVisibility(button_move_task) {

    const div_for_group = button_move_task.parentElement.parentElement.parentElement;
    if (div_for_group.getElementsByClassName('Task_Li').length > 0) {
      button_move_task.style.visibility = "visible";
    } else {
      button_move_task.style.visibility = "hidden";
    }
  }

  createFromJsonFile(obj) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      console.log('File APIs are supported in this browser');
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }

    // --------- read file and create groups ------------
    let json_obj;
    const json_file = document.getElementById('jsonfileinput').files[0];
    function readFile(evt) {
      let f = json_file;
      console.log("file :", f);

      if (f) {
        let r = new FileReader();
        r.onload = function(e) {
          let contents = e.target.result;
          json_obj = JSON.parse(contents);
          console.log('TYPE::::', typeof(json_obj));
          console.log('file contetnt: ', json_obj);
          let i;
          let json_gruops = json_obj['groups'];
          // i is index
          for (i in json_gruops) {
            let json_group = json_gruops[i];
            console.log('json_group', json_group);
            console.log('json_group_name: ', json_group['name']);
            obj.createGroup(json_group);
          }
        }
        r.readAsText(f);
      } else {
        alert("Failed to load file");
      }
    }
    readFile();
    // -----------------------------------------------
  }

  downloadJsonFile(filename) {
    let json_obj = {"groups": []};
    let groups = document.getElementById("main_div").getElementsByClassName("Group_ul");

    for (let i = 0; i < groups.length; i++) {
      let group = groups[i];
      let json_group = {"name": group.getElementsByClassName("group_input")[0].value, "tasks": []};
      let tasks = group.getElementsByClassName("task_input");
      for (let j = 0; j < tasks.length; j++) {
        let task = tasks[j];
        json_group["tasks"].push(task.value);
      }
      json_obj["groups"].push(json_group);
    }

    let a = document.getElementById('download_json');
    a.setAttribute('href',
                   "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json_obj, null, 2)));
    a.setAttribute('download', filename);
    // a.style.display = 'none';
    // document.body.appendChild(a);
    console.log('TAG :::', a)
    // a.click();
    // document.body.removeChild(a);
  }
}

let toDOList = new ToDoList();
function wrapcreateFromJsonFile(){
  toDOList.createFromJsonFile(toDOList);
}

function wrapdownloadJsonFile(){
  toDOList.downloadJsonFile('data.json');
}

function wrapCreateGroup(){
  toDOList.createGroup();
}
