import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskControl } from './taskControl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[TaskControl]
})
export class AppComponent implements OnInit{

  toDoText = "";
  tasksArray=[];
  index: number;
  editStatus = false;
  AddEdit = "Add Item"
  AllMultiple = 'Clear All'
  multipleTasks = []
  localData;

  // itemObj = {
  //   value: "",
  //   completed: false,
  //   checked: false
  // };

  selectAllChecked=false;



  constructor(private taskController:TaskControl) {}

  

  

  ngOnInit() {
    
    this.localData = localStorage.getItem("todoList");

    if (this.localData) {
      //  console.log('stored data',localData);
      this.tasksArray = JSON.parse(this.localData);
    }

  }


  editedTest(todoItem: string, i: number) {
    // console.warn(todoItem,i)
    this.toDoText = todoItem;
    this.index = i
    this.editStatus = true;
    this.AddEdit = 'Edit Item'

  }

  selectAll() {
    for (let index = 0; index < this.tasksArray.length; index++) {
      this.tasksArray[index].checked=!this.tasksArray[index].checked;
      localStorage.setItem("todoList", JSON.stringify(this.tasksArray));

    }
    this.selectAllChecked=!this.selectAllChecked
  }

  editNew() {

    // this.tasksArray.splice(this.index, 1, this.toDoText);
    this.tasksArray[this.index].value = this.toDoText
    this.AddEdit = 'Add Item'
    this.editStatus = false
    this.toDoText = ''
    localStorage.setItem("todoList", JSON.stringify(this.tasksArray));

  }

  addTask() {
    // For service
    if (this.editStatus === false) {

    this.taskController.addTask(this.toDoText, this.tasksArray);

    this.tasksArray=this.taskController.tasksArray;

    }

    else{
      this.editNew()
    }
    // 

    // if (this.editStatus === false) {
    //   this.itemObj = { value: this.toDoText, completed: false, checked: false }
    //   this.tasksArray.push(this.itemObj);
    //   localStorage.setItem("todoList", JSON.stringify(this.tasksArray));
    // }
    // else {
    //   this.editNew()

    // }
    // this.toDoText = ''
    this.toDoText = ''
  }

  clearAll() {
    if (this.multipleTasks.length != 0) {
      this.tasksArray = this.tasksArray.filter(item => !this.multipleTasks.includes(item));
      this.AllMultiple = 'Clear All';
      localStorage.setItem("todoList", JSON.stringify(this.tasksArray));

    }
    else {
      this.tasksArray = [];
      localStorage.setItem("todoList", JSON.stringify(this.tasksArray));

    }

    this.multipleTasks = []
    this.selectAllChecked=false


  }

  moveToTrash(itemToRemove) {
    // this.tasksArray= this.tasksArray.filter(itemToRemove=>itemToRemove!=itemToRemove)
    this.tasksArray.splice(itemToRemove, 1)
    localStorage.setItem("todoList", JSON.stringify(this.tasksArray));

  }

  checkedManual(e, i) {
    this.AllMultiple = 'Clear Selected';

    if (e.checked) {

      this.multipleTasks.push(e)
      // console.log(this.multipleTasks)
    }
    else {

      this.multipleTasks = this.multipleTasks.filter(item => item != e)
    }
    console.log(this.multipleTasks)


  }

  completed(e, i) {
    // this.completeAllStatus = !this.completeAllStatus;

    if (e) {
      this.tasksArray[i].completed = e.completed;

      localStorage.setItem("todoList", JSON.stringify(this.tasksArray));

      // console.log(this.tasksArray)
    }

  }


  markSeleceted() {
    for (let index = 0; index < this.tasksArray.length; index++) {
      if (this.tasksArray[index].checked) {
        this.tasksArray[index].completed=!this.tasksArray[index].completed;
        localStorage.setItem("todoList", JSON.stringify(this.tasksArray));
      }
      this.tasksArray[index].checked=false;
      localStorage.setItem("todoList", JSON.stringify(this.tasksArray));

    }  

    this.selectAllChecked=false
  }

}
