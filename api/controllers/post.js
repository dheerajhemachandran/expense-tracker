import { db } from "../db.js";

export const additem=(req,res)=>{
    const query="INSERT INTO expenses(description,amount,type,uid) VALUES (?);"

    const values= [
        req.body.description,
        req.body.amount,
        req.body.type,
        req.body.uid
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json("item added")
    })
}

export const deleteitem=(req,res)=>{
    const query="DELETE FROM expenses WHERE id = ?;"

    db.query(query,[req.query.id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

export const readitems=(req,res)=>{
    const query="SELECT * FROM expenses WHERE uid = ?;"

    db.query(query,[req.query.uid],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}