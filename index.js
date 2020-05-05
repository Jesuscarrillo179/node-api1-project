const express = require('express')

const server = express()

server.use(express.json())

server.listen(5000, () => {
    console.log("\n API IS UP! \n")
})

let users = [
    {
        id: 1,
        name: "Joe Smith",
        bio: "Hi, Im Joe Smith!",
    },
    {
        id: 2,
        name: "Jane Smith",
        bio: "Hi, Im Jane Smith!",
    },
    {
        id: 3,
        name: "James Smith",
        bio: "Hi, Im James Smith!",
    },
]

server.get('/api/users', (req, res) => {
    if(res){
        res.status(200).json(users)
    }
    else{
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)

    console.log(user)
    if(!user){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else if(user.id === id){
        res.status(200).json(user)
    }
    else{
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

server.post('/api/users', (req, res) => {
    const newUser = req.body

        if(!newUser.bio || !newUser.name){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
        else if(newUser.bio != "" && newUser.name != ""){
            users.push(newUser)
            res.status(201).json(users)
        }
        else{
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
})

server.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    const updateUser = req.body 

    console.log(updateUser)
    if(!user){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else if(!updateUser.bio || !updateUser.name){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else if(updateUser.bio !== "" && updateUser.name !== ""){
        users = users.filter(user => user.id !== id)
        users.push(updateUser)
        res.status(200).json(users)
    }
    else{
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)

        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        else if(user.id === id){
            users = users.filter(user => user.id !== id)
            res.status(200).json(users)
        }
        else{
            res.status(500).json({ errorMessage: "The user could not be removed" })
        }
})