import { db } from "../db.js";
import bcrypt from "bcrypt"

export const login=(req,res)=>{
    const query="SELECT * FROM users WHERE name = ?;"

    db.query(query,[req.body.name],(err,data)=>{
        if(err) return res.json(err)
        if(data.length ===0) return res.status(404).json("user not found");

        const ispass=bcrypt.compareSync(req.body.password,data[0].password)
        if(!ispass) return res.status(400).json("password not matching")
        return res.status(200).json({key:data[0].id,name:data[0].name})
    })
}

export const register=(req,res)=>{
    
    const query="SELECT * FROM users WHERE email = ? OR name = ?;"

    db.query(query,[req.body.email,req.body.name],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("user already exist");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const query="INSERT INTO users(name,email,password) VALUES (?);"
        const values= [
            req.body.name,
            req.body.email,
            hash
        ]

        db.query(query,[values],(err,data)=>{
            if (err) return res.json(err)
            return res.status(200).json("user has been updated")
        })
    })
}
