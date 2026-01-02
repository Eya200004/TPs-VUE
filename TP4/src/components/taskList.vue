<template>
  <div class="container">
    <h3 class="title">📋 Total des tâches : {{ totalTasks }}</h3>

    <div class="filters">
      <button 
        @click="filtre = 'tous'" 
        :class="{ actif: filtre === 'tous' }">
        Toutes
      </button>

      <button 
        @click="filtre = 'àfaire'" 
        :class="{ actif: filtre === 'àfaire' }">
        À faire
      </button>

      <button 
        @click="filtre = 'done'" 
        :class="{ actif: filtre === 'done' }">
        Terminées
      </button>
    </div>

    <div v-for="t in filteredTasks" :key="t.id" class="task">
      <h4>{{ t.title }}</h4>
      <p>{{ t.description }}</p>

      <button 
        v-if="!t.completed"
        class="done-btn"
        @click="marquerTerminee(t)">
        ✔ Marquer comme terminée
      </button>

      <span v-else class="done-text">✔ Terminée</span>
    </div>
  </div>
</template>

<script>
import tasks from "../assets/tasks.json";

export default {
  name: "TaskList",

  data() {
    return {
      tasks,
      filtre: "tous"
    };
  },

  computed: {
    totalTasks() {
      return this.tasks.length;
    },

    filteredTasks() {
      if (this.filtre === "àfaire") return this.tasks.filter(t => !t.completed);
      if (this.filtre === "done") return this.tasks.filter(t => t.completed);
      return this.tasks;
    }
  },

  methods: {
    marquerTerminee(t) {
      t.completed = true;
    }
  }
};
</script>

<style>
.container {
  max-width: 700px;
  margin: auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
}
.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
}
.filters button {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: #e0e0e0;
  cursor: pointer;
  transition: 0.3s;
}
.filters button:hover {
  background: #b2ebf2;
}

.actif {
  background: #00bcd4 !important;
  color: white;
}
.task {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}
.task:hover {
  transform: scale(1.02);
}
.task h4 {
  margin: 0;
  color: #333;
}

.task p {
  color: #666;
}
.done-btn {
  margin-top: 10px;
  background: #4caf50;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
}
.done-btn:hover {
  background: #43a047;
}
.done-text {
  color: #4caf50;
  font-weight: bold;
}
</style>
