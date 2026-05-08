import {Component, Inject, OnInit} from '@angular/core';
import {MaterialModule} from '../../../../app.material.module';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../../../../models/category.model';
import {TaskService} from '../../../../core/services/task.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../../../models/task.model';

@Component({
  selector: 'app-create-edit-task-component',
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-edit-task-component.html',
  styleUrl: './create-edit-task-component.scss',
})
export class CreateEditTaskComponent implements OnInit {
  categories!: Category[];
  form!: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {task: Task | null; categories: Category[]},
  ) {}
  ngOnInit() {
    this.categories = this.data.categories;
    this.form = this.fb.group({
      title: [this.data.task?.title || '', Validators.required],
      description: [this.data.task?.description || ''],
      categoryId: [this.data.task?.categoryId || '', Validators.required],
      completed: [this.data.task?.completed || false]
    })
  }

  save(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = this.form.getRawValue() as Task;

    const request$ = this.data.task?.id
      ? this.taskService.updateTask(this.data.task.id, payload)
      : this.taskService.createTask(payload);

    request$.subscribe({
      next: data => {
        this.saving = false;
        this.snackBar.open('Task saved successfully.', 'Close', {duration:  2000});
        this.dialogRef.close(true);
      },
      error: error => {
        this.saving = false;
        this.snackBar.open('Save failed.', 'Close', {duration:  2000});
      }
    })
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
