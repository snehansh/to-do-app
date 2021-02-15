<template>
  <div class="container">
    <div class="welcome">{{ welcomeMessage }}</div>

    <div class="alert alert-primary" v-show="message">{{ message }}</div>

    <div>
      <div class="form-group row">
        <label for="Name" class="col-sm-1">Title</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="Name"
            v-model="model.Name"
            class="form-control"
          />
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            id="isCompleted"
            v-model="model.IsCompleted"
            class="form-check-input"
          />

          <label for="isCompleted" class="form-check-label">Completed</label>
        </div>
      </div>
      <div>
        <button type="submit" @click="AddToDo" class="btn btn-primary">
          Add ToDo
        </button>
      </div>
    </div>

    <section>
      <ol class="list-group">
        <li class="list-group-item" v-for="todo in ToDos" :key="todo.Name">
          {{ todo.Name }}, {{ todo.IsCompleted ? "Completed" : "Not Done" }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ToDoModel from "@/models/ToDoModel";

@Component({
  components: {}
})
export default class ToDoWithoutStore extends Vue {
  welcomeMessage: string;
  message: string;
  todos: Array<ToDoModel>;

  model: ToDoModel;

  constructor() {
    super();
    this.welcomeMessage = "Welcome to the ToDo App!";
    this.todos = [];
    this.model = new ToDoModel();
    this.message = "";
  }

  // without store
  // get ToDos(): ToDoModel[] {
  //   const todos = this.todos;
  //   return todos;
  // }

  get ToDos(): ToDoModel[] {
    // const todos = this.todos;
    const todos = this.$store.state.todos;
    return todos;
  }

  AddToDo() {
    this.message = `Adding ${this.model.Name} to ToDo List...`;

    if (this.ToDos.some(x => x.Name === this.model.Name)) {
      this.message = `ToDo item ${this.model.Name} already exists in your list`;
      return;
    }

    // this.todos.push(this.model);

    this.$store
      .dispatch("addToDo", this.model)
      .then(() => {
        this.message = "ToDo added successfully to your list";
        setTimeout(() => {
          this.message = "";
        }, 1500);
      })
      .catch(error => {
        console.error(error);
      });

    this.model = new ToDoModel();
  }
}
</script>

<style scoped>
.welcome {
  color: #090629e5;
  margin: 20px;
  font-size: 20px;
}
.message {
  margin: 20px;
  font-size: 14px;
}
section {
  margin: 20px;
}
ol.list-group li:nth-of-type(even) {
  background: #cdecda;
}
</style>
