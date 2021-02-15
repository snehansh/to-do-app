import ToDoModel from "@/models/ToDoModel";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: Array<ToDoModel>()
  },

  mutations: {
    addToDo (state, todoModel: ToDoModel) {
      state.todos.push(todoModel)
    }
  },
  
  actions: {
    addToDo (context, todoModel: ToDoModel) {
      // context.commit('addToDo', todoModel)

      return new Promise<void>((resolve, reject) => {
        context.commit('addToDo', todoModel)
        resolve()
      })
    }
  },
  modules: {}
});
