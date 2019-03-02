"use strict";

class ToDoList {
  constructor() {
    console.log('START: this: ', this);
    this.group_index = 1;
    this.task_initializer_index = 1;
    this.task_index = 1;
  }

  createGroup() {
    console.log('TEST "this" 1:', this);

    let drag_source;

    let div_for_group = document.createElement('div');
    let div_for_group_id = 'div_for_group_' + this.group_index;
    div_for_group.id = div_for_group_id;
    div_for_group.className = 'Div_For_Group';

    let group_ul = document.createElement('ul');
    let group_name = "Group...";
    let group_ul_id = 'group_ul_' + this.group_index;
    group_ul.id = group_ul_id;
    this.group_index++;
    group_ul.className = 'Group_ul';

    let li = document.createElement("li");

    let group_input_field = document.createElement("input");
    group_input_field.placeholder = group_name;

    li.appendChild(group_input_field);

    let span_remove_group = document.createElement("SPAN");
    let text_remove_group = document.createTextNode("Remove Group");
    span_remove_group.className = "remove_group";
    span_remove_group.appendChild(text_remove_group);
    span_remove_group.onclick = function() {
      remove_element(group_ul);
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
    // move_task_up_button.value = "Move Task Up";
    // move_task_up_button.className = "move_task_up_button";

    let move_task_down_button = document.createElement("input");
    let move_task_down_button_id = "move_task_down_button_" + this.task_initializer_index;
    move_task_down_button.id = move_task_down_button_id;
    move_task_down_button.type = "button";
    move_task_down_button.value = "Move Task Down";
    move_task_down_button.className = "move_task_down_button";

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

    function createTask(group_ul_id, task_initializer_id, obj) {

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

      let task_name = document.getElementById(task_initializer_id).value;

      // let name = document.createTextNode(task_name);
      let task = document.createElement("input");
      task.id = 'task_' + obj.task_index
      // task.value = task_name
      task.placeholder = 'Task' + obj.task_index;
      if (task_name) {
        task.value = task_name;
      }

      li.appendChild(task);
      document.getElementById(group_ul_id).appendChild(li);
      document.getElementById(task_initializer_id).value = "";

      let span_remove_task = document.createElement("SPAN");
      let text_remove_task = document.createTextNode("Remove Task");
      span_remove_task.className = "remove_task";
      span_remove_task.appendChild(text_remove_task);
      span_remove_task.onclick = function() {
        // in this context 'this' is span_remove_task
        remove_element(this);
      }
      li.appendChild(span_remove_task);

      obj.task_index++;
    }

    function remove_element(element) {

      // does not remove, but hides
      // let parent = element.parentElement;
      // parent.style.display = "none";

      // ---- two code snippets below do the same thing (parentElement/parentNode) ---

      let parent = element.parentElement;
      parent.parentElement.removeChild(parent);

      // let parent = element.parentNode;
      // parent.parentNode.removeChild(parent);

      // ----------------------------------------------------------------------------
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

    function enterKeyPressAddTask(event, group_ul_id, task_initializer_id, obj) {
      const x = event.which || event.keyCode;
      if (x === 13) {
        createTask(group_ul_id, task_initializer_id, obj);
      }
    }
    console.log('TEST "this" 2:', this);

    let obj = this;
    add_task_button.onclick = function() {
      createTask(group_ul_id, task_initializer_id, obj)
    };
    task_initializer.onkeypress = function() {
      enterKeyPressAddTask(event, group_ul_id, task_initializer_id, obj)
    };

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
}

let toDOList = new ToDoList();
function start(){
  toDOList.createGroup();
}
