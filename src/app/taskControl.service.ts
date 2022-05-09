export class TaskControl {
    
    tasksArray=[];
  
    itemObj = {
      value: "",
      completed: false,
      checked: false
    };
    
    addTask(toDoText:string, arrayOfTasks:any) {

        // this.editStatus===false ? this.tasksArray.push(this.toDoText) : this.editNew();
          this.tasksArray=arrayOfTasks;
          this.itemObj = { value: toDoText, completed: false, checked: false }
          this.tasksArray.push(this.itemObj);
          localStorage.setItem("todoList", JSON.stringify(this.tasksArray));
          // console.log(this.tasksArray)
       
      }

  
    
}