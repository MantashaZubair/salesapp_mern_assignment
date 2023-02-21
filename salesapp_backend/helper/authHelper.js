const bcrypt = require('bcrypt')

//hashpassword
const hashPassword =async(password)=>{
 try {
    const saltRound = 10
    const hashedPassword = await bcrypt.hash(password,saltRound)
    return hashedPassword
 } catch (error) {
    console.log(error)
 }
}

//compare password
const comparePassword = async(password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword)
 }


module.exports= {hashPassword , comparePassword}