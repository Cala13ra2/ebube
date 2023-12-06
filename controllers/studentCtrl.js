const Students = require("../models/StudentsModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Wallet } = require("../models/walletModel")
const axios = require("axios")



const getAllStudents = async(req, res)=>{

    return res.status(200).json({
        message: "Successfully from controller"
    })
}


const studentSignUp = async(req, res)=>{

    const { name, email, password, dept, location } = req.body

    const alreadyExisting =  await Students.findOne({ email })

    if(alreadyExisting){
        return res.status(400).json({message: "This user account already exixt!"})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newStudent = new Students({ name, email, password: hashedPassword, dept, location })

    await newStudent.save()

    const userWallet = await Wallet.create({
        userId: newStudent._id,
    })

    return res.status(200).json({
        mesasge: "Registration successful",
        student: { ...newStudent._doc, password: ""}
    })
}

const studentLogin = async(req, res)=>{

    const { email, password } = req.body

    const alreadyExisiting = await Students.findOne({ email })

    if(!alreadyExisiting){
        return res.status(404).json({message: "This user does not exist!"})
    }
    
    const isMatch = await bcrypt.compare(password, alreadyExisiting.password)

    if(!isMatch){
        return res.status(400).json({message: "Incorrect email or password!"})
    }

    const payload = {
        id: alreadyExisiting._id,
        role: "user"
    }


    const activeToken = await jwt.sign(payload, process.env.Token, {expiresIn: "5h"})
    const accessToken = await jwt.sign(payload, process.env.Token, {expiresIn: "3m"})
    const refreshToken = await jwt.sign(payload, process.env.Token, {expiresIn: "3d"})

    alreadyExisiting.refreshToken = refreshToken

    await alreadyExisiting.save()




    return res.status(200).json({
        message: "Login successful",
        accessToken,
        user: alreadyExisiting
    })
}

const initiateTransaction = async(req, res)=>{
    try {
        const { emailAddress, amount, callbackUrl } = req.body
    
        const result = await axios.post("https://api.maczuby.com/transaction/initialize",
        { emailAddress, amount, callbackUrl },
        {headers: { "Content-Type": "application/json"}},
        )

        const data = result.data
    
        return res.status(200).json(data)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const verifyTransaction = async(req, res)=>{

    
    try {
        const id = req.params.id

        const { userId } = req.body
    
        const result = await axios.get(`https://api.maczuby.com/transaction/verify/${id}`,
        { headers: { "Content-Type": "application/json"}}
        )
    
        const data = result.data

        if(data.gateway_response === "Successful"){
            await fundWalet(userId, data.amount, res)
        }

        return res.status(200).json(data)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const fundWalet = async(userId, amount, res)=>{

    const userWallet = await Wallet.findOne({ userId })

    if(!userWallet) return res.status(404).json({message: "User wallet not found!"})

    if(userWallet){
        userWallet.balance += amount

        await userWallet.save()
    }

    return userWallet

}



module.exports = {
    getAllStudents,
    studentSignUp,
    studentLogin,
    initiateTransaction,
    verifyTransaction
    
}