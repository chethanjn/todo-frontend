import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../app.material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Task} from  '../../models/task.model';
import {Category} from '../../models/category.model';
import {Router} from '@angular/router';
import {TaskService} from '../../core/services/task.service';
import {CategoryServices} from '../../core/services/category.services';
import {AuthService} from '../../core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe, NgClass} from '@angular/common';
import {CreateEditTaskComponent} from './popup/create-edit-task-component/create-edit-task-component';
import {ConfirmPopup} from '../../shared/confirm-popup/confirm-popup';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, DatePipe, NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  loading = false;

  search = '';
  selectedCategory='';
  createdFrom = '';
  createdTo = '';

  displayedColumns: string[] = ['title', 'description', 'categoryName', 'completed', 'createdAt','actions'];

  constructor(
    private router: Router,
    private taskService: TaskService,
    private categoryService: CategoryServices,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadTasks();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        this.snackBar.open('Failed to load categories', 'Close',{duration: 3000});
      }
    })
  }

  loadTasks() {
    this.taskService.getTasks({
      search: this.search || undefined,
      category: this.selectedCategory || undefined,
      createdFrom: this.createdFrom || undefined,
      createdTo: this.createdFrom || undefined
    }).subscribe({
      next: data => {
        this.tasks = data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.snackBar.open('Failed to load tasks', 'Close',{duration: 3000});
      }
    })
  }

  applyFilters(){
    this.loadTasks()
  }

  clearFilters(){
    this.search = '';
    this.selectedCategory = '';
    this.createdFrom = '';
    this.createdTo = '';
    this.loadTasks();
  }

  openCreateTaskPopUp(){
   const createPopUp = this.dialog.open(CreateEditTaskComponent,{
     width: '500px',
     data: {task: null, categories: this.categories}
   });

   createPopUp.afterClosed().subscribe(result => {
     if (result) {
       console.log(result);
       this.loadTasks();
     }
   });
  }

  openEditTaskPopUp(task: Task){
    const editPopUp = this.dialog.open(CreateEditTaskComponent,{
      width: '500px',
      data: {task, categories: this.categories}
    });
    editPopUp.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    })
  }

  deleteTask(task: Task){
    const confirmPopUp = this.dialog.open(ConfirmPopup,{
      width: '500px',
      data:{
        title: 'Delete task',
        message: `Are you sure you want to delete this task? "${task.title}"?"`
      }
    });

    confirmPopUp.afterClosed().subscribe(confirmed => {
      if(!confirmed || !task.id){
        return;
      }
      this.taskService.deleteTask(task.id).subscribe({
        next: data => {
          this.snackBar.open('Task Deleted !', 'Close',{duration: 3000});
          this.loadTasks();
        },
        error: err => {
          this.snackBar.open('Failed to delete task', 'Close',{duration: 3000});
        }
      })
    })
  }

  logout(){
    this.authService.logout();
  }

}
