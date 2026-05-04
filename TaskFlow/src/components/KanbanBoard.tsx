"use client";

import { useEffect, useState } from "react";
import { Board, Column, Task } from "@/types/kanban";
import styles from "./KanbanBoard.module.css";

export default function KanbanBoard() {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const res = await fetch("/api/boards");
      
      if (!res.ok) {
        const text = await res.text();
        console.error("API Error Response:", text);
        throw new Error(`Server returned ${res.status}: ${text.slice(0, 100)}`);
      }

      const data = await res.json();
      setBoard(data);
    } catch (err) {
      console.error("Failed to fetch board", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (columnId: string) => {
    if (!newTaskTitle.trim()) return;

    try {
      const column = board?.columns.find(c => c.id === columnId);
      const order = column ? column.tasks.length : 0;

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTaskTitle, columnId, order }),
      });

      if (res.ok) {
        setNewTaskTitle("");
        setActiveColumnId(null);
        fetchBoard();
      }
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = async (e: React.DragEvent, targetColumnId: string) => {
    const taskId = e.dataTransfer.getData("taskId");
    const task = board?.columns.flatMap(c => c.tasks).find(t => t.id === taskId);

    if (task && task.columnId !== targetColumnId) {
      try {
        const res = await fetch("/api/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: taskId, columnId: targetColumnId, order: 0 }),
        });

        if (res.ok) fetchBoard();
      } catch (err) {
        console.error("Failed to move task", err);
      }
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchBoard();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  if (loading) return <div className="flex-center" style={{ height: "400px" }}>Cargando tablero...</div>;
  if (!board) return <div>No se pudo cargar el tablero.</div>;

  return (
    <div className={styles.boardContainer}>
      <header className={styles.header}>
        <h2 className="h2 text-gradient">Tablero de Tareas</h2>
        <p className="text-body">Gestiona tus tareas.</p>
      </header>

      <div className={styles.columns}>
        {board.columns.map((column) => (
          <div 
            key={column.id} 
            className={`glass ${styles.column}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, column.id)}
          >
            <div className={styles.columnHeader}>
              <h3 className="h3">{column.name}</h3>
              <span className={styles.badge}>{column.tasks.length}</span>
            </div>

            <div className={styles.taskList}>
              {column.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`glass ${styles.taskCard}`}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                >
                  <p>{task.title}</p>
                  <button 
                    onClick={() => deleteTask(task.id)} 
                    className={styles.deleteBtn}
                    title="Eliminar tarea"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {activeColumnId === column.id ? (
              <div className={styles.addTaskForm}>
                <input 
                  autoFocus
                  type="text" 
                  value={newTaskTitle} 
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Título de la tarea..."
                  className={styles.input}
                  onKeyDown={(e) => e.key === "Enter" && addTask(column.id)}
                />
                <div className={styles.formActions}>
                  <button onClick={() => addTask(column.id)} className="btn btn-primary">Añadir</button>
                  <button onClick={() => setActiveColumnId(null)} className="btn btn-secondary">Cancelar</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setActiveColumnId(column.id)} 
                className={styles.addBtn}
              >
                + Añadir tarea
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
