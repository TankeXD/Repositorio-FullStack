import KanbanBoard from "@/components/KanbanBoard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.content} animate-fade-in`}>
        {/* Simple Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 className="h1">
            Tanke<span className="text-gradient">XD</span>
          </h1>
          <p className="text-body" style={{ fontSize: "1.25rem" }}>
            El sistema de gestión de proyectos.
          </p>
        </div>

        {/* The Kanban Board */}
        <KanbanBoard />
      </div>
    </main>
  );
}
