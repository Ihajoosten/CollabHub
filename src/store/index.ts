import { createStore } from "vuex";
// import axios from "axios"; <--------- uncomment axios when you are going to make HTTP calls to your backend API

// Interface that defines your store's state properties
interface State {
  your_state: string | null;
}

// Central URL endpoints from your backend
const ENDPOINTS = {
  RegisterUser_URL: "",
  LoginUser_URL: "",
};

// Your client's hosting adress which needs to pass CORS on the backend e.g http://localhost:5000
const ORIGIN = "";

// Define Headers you want to sent with the HTTP requests
const HEADERS = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Content-Type": "application/json",
};

// Vuex Store
export default createStore({
  state: {
    your_state: "",
  } as State,
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
