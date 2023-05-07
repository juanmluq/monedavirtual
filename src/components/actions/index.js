import axios from "axios";

export function getUsers(){
    return async function(dispatch){
        var json = await axios.get("https://backmonedas-production.up.railway.app/usermonedas");

        return dispatch({
            type: "GET_USERS",
            payload: json.data
        })
    }
}

export function postUser(payload){
    return async function(dispatch){
        const response = await axios.post("https://backmonedas-production.up.railway.app/usermoneda", payload);
        return response
    }
}

export function putUser(payload, id){
    return async function(dispatch){
        const respons = await axios.put("https://backmonedas-production.up.railway.app/usermoneda/" + id , payload);
        return respons
    }
}

export function putAccess(payload, id){
    return async function(){
        const respon = await axios.put("https://backmonedas-production.up.railway.app/access/" + id , payload);
        return respon
    }
}

export function putPagoPending(payload, id){
    return async function(){
        const resp = await axios.put("https://backmonedas-production.up.railway.app/pagopending/" + id , payload);
        return resp
    }
}



export function putPassword(payload, id){
    return async function(){
        const res = await axios.put("https://backmonedas-production.up.railway.app/password/" + id , payload);
        return res
    }
}