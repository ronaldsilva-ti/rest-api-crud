const { Pool } = require('pg');
const log =  console.log;

const pool = new Pool({
    host: 'localhost',
    user:'postgres',
    password:'password',
    database:'restapi',
    port:'5432'
});

const getUsers = async (req,res) => {
    const response = await pool.query('SELECT * from users');
    res.status(200).json(response.rows);
}

const getUserById = async (req,res) => {
   try {  
        const response = await pool.query('SELECT * from users WHERE id = $1',[req.params.id]);
        if(response.rows === []){
            res.status(200).json({
                message:'Usuario não existente',
                response: response,
                
            })

        }else{
            res.status(200).json(response.rows)
        }

   } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Error when Searching'
        })
       
   }
}

const createUsers = async (req,res) => {
    try {
        const { name, email } = req.body;        
        if(name !== '' && email !== ''){
            const response = await pool.query('INSERT INTO users (name,email) VALUES ($1, $2)',[name,email]);
       
            res.status(201).json({
                message:'User Added Succesfully',
                body:{
                    user:{ name, email}
                }
            })

        }else{
            res.status(400).json({
                message:'User Added Error',            
            })
        }
    }catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Error in create user'
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM users WHERE id = $1',[id])
        
        res.status(200).json({
            message:`User ID ${id} deleted successfully`,          
            
        })

        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:'Error when deleting user'
        })
    }
}

const updateUser = async (req,res,next) =>{
    try {
        const { name, email } = req.body;
        const id = req.params.id;

        if(name !== '' && email !== ''){
            const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',[
                name,
                email,
                id
            ])
    
            res.status(200).send({
                message:'User Updated successfully from ID ' + id,
                user:{
                    name:name,
                    email:email
                }
            })
        }
        next();        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:'Error when update user'
        })
    }
}

module.exports = {
    getUsers,
    createUsers,
    getUserById,
    deleteUser,
    updateUser
}