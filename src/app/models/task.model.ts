export interface Task {
  id?: string;
  title: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}
