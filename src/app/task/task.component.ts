import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Output() trash = new EventEmitter<any>();

  @Output() completedTask = new EventEmitter<any>();

  @Output() checkedOut =new EventEmitter<any>();

  @Output() completedOut =new EventEmitter<any>();

  @Input() todoItem: any;

  @Input() checkMark: boolean;

  completeStatus = false;
  

  @Output() edited = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    this.edited.emit(this.todoItem.value);

  }

  completeStyle() {

    return this.completeStatus || this.todoItem.completed === true ? 'line-through' : ''

  }

  completed() {
    this.todoItem.completed=!this.todoItem.completed
    this.completedOut.emit(this.todoItem)

  }

  moveToTrash() {
    this.trash.emit()

  }

  checked(){
    this.todoItem.checked=!this.todoItem.checked
    this.checkedOut.emit(this.todoItem)
  }


}
