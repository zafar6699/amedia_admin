// State
export const state  = () => ({
    users : []
})

// Mutations
export const mutations = {
    addUser (state,data) {
        state.users.push(data)
    },
    removeUserById(state,id) {
        const user = state.users.map((el,i) => {
            if(el.userId == id){
                    return i 
            }
        })
        state.users.splice(user.join(''),1)
    }
}

//Action 
export const actions = {
    async getAllUser () {
        
    }
}

//Getters 
export const getters = {

}

