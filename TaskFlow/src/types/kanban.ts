export interface Task {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  columnId: string;
}

export interface Column {
  id: string;
  name: string;
  order: number;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}
