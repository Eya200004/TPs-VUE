<template>
  <div>
    <h3>Total des taches:{{ totalTasks }}</h3>
    <div>
      <button 
        @click="filtre = 'tous'" 
        :class="{ actif: filtre === 'tous' }">
        Toutes
      </button>
      <button 
        @click="filtre= 'àfaire'" 
        :class="{actif: filtre === 'àfaire' }">
        À faire
      </button>

      <button 
        @click="filtre = 'done'" 
        :class="{actif: filtre === 'done' }">
        Terminées
      </button>
    </div>

    <div v-for="t in filteredTasks" :key="t.id" class="task">
      <h4>{{ t.title }}</h4>
      <p>{{ t.description }}</p>
      <button 
        v-show="!t.completed" 
        @click="marquerTerminee(t)">
        Marquer comme terminée
      </button>
        <span v-if="t.completed">Terminée!</span>
    </div>
  </div>
</template>

<script>
import tasks from "../assets/tasks.json";
export default{
  name: "TaskList",

  data(){
    return{
      tasks: tasks,
      filtre: "tous"
    };
  },

  computed:{
    totalTasks(){
      return this.tasks.length;
    },

    filteredTasks(){
      if (this.filtre === "àfaire"){
        return this.tasks.filter(t => !t.completed);}
      if (this.filtre === "done"){
        return this.tasks.filter(t => t.completed);}
      return this.tasks;
    }
  },

  methods:{
    marquerTerminee(t){
      t.completed = true;
    }
  }
};
</script>

<style>
.task{
  border:1px solid #ccc;
  padding:1rem;
  margin:1rem 0;
}

.actif{
  background:#00bcd4;
  color:white;
}
</style>
