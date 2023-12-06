

const validateStudentSignup = (req, res, next)=>{

    const { name, email, password } = req.body

    error = []

    if(!name){
        error.push("Please enter your name")
    }

    if(!email){
        error.push( "Please enter your email")
    }

    if(!password){
        error.push("Please enter a password.")
      } else if(password.length < 6) {
        error.push("Please password must be 6 chars.")
      } else if (!/[A-Z]/.test(password)) {
        error.push("Please password must contain a capital letter")
      } else if (!/[0-9]/.test(password)) {
        error.push("Please password must contain a number")
      }
    
    if(error.length > 0){
        return res.status(400).json( error)
    }

    next()
}

const validateStudentLogin = (req, res, next)=>{

    const { email, password } = req.body

    error = []

    if(!email){
        error.push( "Please enter your email")
    }

    if(!password){
        error.push("Please enter a password.")
      } 
    
    if(error.length > 0){
        return res.status(400).json( error)
    }

    next()
}





module.exports = {
    validateStudentSignup,
    validateStudentLogin
}