import axios from "axios";

export const rejester =newUser=>{
return axios
    .post('/register',{
        name: newUser.name,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email
    }).then(res=>{
        console.log("Register!")
    })
}

export const login = user => {
    return axios
        .post('/login', {
            email: user.email,
            password: user.password
           
        }).then(res => {
        // localStorage.setItem('usertoken',res.data)   
        // return res.data
            console.log("LOgin!")
}).catch(err=>{
    console.log(err)
})
}