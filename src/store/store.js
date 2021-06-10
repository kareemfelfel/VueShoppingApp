import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        error: false,
        loading: false,
        Items: [],
        Item: {
            id: Number,
            name: "",
            order: Number,
            complete: Boolean,
            img: ""
        },
        favorites: [],
    },
    mutations: {
        addToItems(state, payload) {
            state.Items.push(payload);
        },
        setItems(state, payload) {
            state.Items = payload
        },
        editItem(state, payload) {
            Vue.set(state.Items, state.Items.findIndex(item => item.id == payload.id), payload);
        },
        clearFavorites(state) {
            state.favorites = [];
        },
        removeItem(state, payload) {
            state.Items.splice(state.Items.indexOf(payload), 1);
        },
        clearItems(state) {
            state.Items = [];
        },
        revertError(state) {
            state.error = false;
        },
        setError(state, payload){
            state.error = payload;
        },
        getItem(state, payload){
            state.Item = payload;
        },
        completeItem(state, payload){
            Vue.set(state.Items, state.Items.findIndex(item => item.id == payload.id), payload);
        },
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state){
            state.loading = false;
        }
    },
    actions: {
        removeItem({commit}, payload){
            axios.delete('http://localhost:3000/Items/' + payload.id)
                .then(() => {
                    commit("removeItem", payload);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        completeItem({commit}, payload){
            axios.patch('http://localhost:3000/Items/' + payload.id, {complete: true})
                .then((response) =>{
                    console.log(response.data);
                    commit("completeItem", response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        clearFavorites({ commit }) {
            commit("clearFavorites");
        },
        revertError({commit}){
            commit("revertError");
        },
        //------------------Called from the form to add an item--------------
        addToItems({commit}, payload) {
            //start loading
            commit("startLoading");
            axios.post('http://localhost:3000/Items', payload)
                .then((response) => {
                    commit("addToItems", response.data);
                    commit("setError", false);
                    commit("stopLoading");
                })
                .catch(() => {
                    commit("setError", true);
                    commit("stopLoading");
                });
        },
        editItem({commit}, payload){
            axios.put('http://localhost:3000/Items/' + payload.id, payload)
                .then((response) => {
                    commit("editItem", response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        clearItems({commit}) {
            commit("clearItems");
        },
        setItems({commit}, payload) {
            commit("setItems", payload)
        },
        //---------- Called from the home page at initial set up-------
        loadAllItems() {
            axios.get('http://localhost:3000/Items')
                .then((response) => {
                    this.dispatch("setItems", response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getItem({commit}, id){
            axios.get('http://localhost:3000/Items/' + id)
                .then((response) => {
                    console.log(response.data);
                    commit("getItem", response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        filterItems({commit, state}, text){
            //if a string is not empty
            if (text.length > 0) {
                let newItems = state.Items.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
                commit("setItems", newItems);
            }
            else{
                this.dispatch("loadAllItems");
            }
        }
    },
});

