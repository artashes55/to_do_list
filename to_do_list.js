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
    let ul = document.createElement('ul');
    let group_id = 'Group_' + this.group_index;
    ul.id = group_id;
    this.group_index++;
    ul.className = 'Group';
    let group_name = "Group...";

    let li = document.createElement("li");

    let group_input_field = document.createElement("input");
    group_input_field.placeholder = group_name;

    li.appendChild(group_input_field);
    ul.appendChild(li);

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
    ul.appendChild(li);
    document.getElementById("div_1").appendChild(ul);

    function createTask(group_id, task_initializer_id, obj) { 
      console.log(group_id, task_initializer_id);
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
      document.getElementById(group_id).appendChild(li);
      document.getElementById(task_initializer_id).value = "";

      // let span = document.createElement("SPAN");
      // let txt = document.createTextNode("\u00D7");
      // span.className = "close";
      // span.appendChild(txt);
      // li.appendChild(span);

      obj.task_index++;
    }

    function enterKeyPressAddTask(event, group_id, task_initializer_id, obj) {
        const x = event.which || event.keyCode;
        if (x == 13) {
          createTask(group_id, task_initializer_id, obj);
    }
  }
    console.log('TEST this', this);

    let obj = this;
    add_task_button.onclick = function() {
      createTask(group_id, task_initializer_id, obj)
    };
    task_initializer.onkeypress = function() {
      enterKeyPressAddTask(event, group_id, task_initializer_id, obj)
    };
  }
}

let toDOList = new ToDoList();
