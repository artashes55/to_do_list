"use strict";

class ToDoList {
  constructor() {
    console.log('START: this: ', this);
    this.group_index = 1;
    this.task_initializer_index = 1;
    this.task_index = 1;
  }

  createGroup() {
    console.log('TEST this', this);

    let div_for_group = document.createElement('div');
    let div_for_group_id = 'div_for_group_' + this.group_index;
    div_for_group.id = div_for_group_id;
    div_for_group.className = 'Div_For_Group';

    let ul_group = document.createElement('ul');
    let group_name = "Group...";
    let ul_group_id = 'ul_group_' + this.group_index;
    ul_group.id = ul_group_id;
    this.group_index++;
    ul_group.className = 'ul_Group';

    let li = document.createElement("li");

    let group_input_field = document.createElement("input");
    group_input_field.placeholder = group_name;

    li.appendChild(group_input_field);
    ul_group.appendChild(li);

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
    this.task_initializer_index++;

    li.appendChild(task_initializer);
    li.appendChild(add_task_button);
    ul_group.appendChild(li);
    div_for_group.appendChild(ul_group);
    document.getElementById("main_div").appendChild(div_for_group);

    function createTask(ul_group_id, task_initializer_id, obj) {
      console.log('ul_group_id, task_initializer_id:',
                  ul_group_id, task_initializer_id);
      let li = document.createElement("li");
      li.id = 'task_li_' + obj.task_index;
      li.draggable="true";
      let task_name = document.getElementById(task_initializer_id).value;
      if (task_name === '') {
        task_name = "...";
      }

      // let name = document.createTextNode(task_name);
      let task = document.createElement("input");
      task.id = 'task_' + obj.task_index
      // task.value = task_name
      task.placeholder = task_name;
      if (task_name) {
        task.value = task_name;
      }

      li.appendChild(task);
      document.getElementById(ul_group_id).appendChild(li);
      document.getElementById(task_initializer_id).value = "";

      let span_remove_task = document.createElement("SPAN");
      let text_remove_task = document.createTextNode("Remove");
      span_remove_task.className = "remove_task";
      span_remove_task.appendChild(text_remove_task);
      li.appendChild(span_remove_task);

      span_remove_task.onclick = function() {
        // in this context 'this' is span_remove_task

        // does not remove, but hides
        // let parent = this.parentElement;
        // parent.style.display = "none";

        // ---- two code snippets below do the same thing (parentElement/parentNode) ---

        let parent = this.parentElement;
        parent.parentElement.removeChild(parent);

        // let parent = this.parentNode;
        // parent.parentNode.removeChild(parent);

        // ----------------------------------------------------------------------------
      }

      obj.task_index++;
    }

    function enterKeyPressAddTask(event, ul_group_id, task_initializer_id, obj) {
      const x = event.which || event.keyCode;
      if (x == 13) {
        createTask(ul_group_id, task_initializer_id, obj);
    }
  }
    console.log('TEST this', this);

    let obj = this;
    add_task_button.onclick = function() {
      createTask(ul_group_id, task_initializer_id, obj)
    };
    task_initializer.onkeypress = function() {
      enterKeyPressAddTask(event, ul_group_id, task_initializer_id, obj)
    };
  }
}

let toDOList = new ToDoList();
