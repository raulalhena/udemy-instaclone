const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user, SECRET_KEY, expiresIn) {
    const { id, name, email, username } = user;
    const payload = {
        id,
        name,
        email,
        username
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register (input) {
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const { email, username, password } = newUser;

    // Revisamos si email está en uso
    const foundEmail = await User.findOne({ email });
    if(foundEmail) throw new Error("Email en uso");
    
    // Revisamos si username está en uso
    const foundUsername = await User.findOne({ username });
    if(foundUsername) throw new Error("Nombre de usuario en uso");

    // Encriptar password
    const salt = await bcrypt.genSaltSync(10);
    newUser.password = await bcrypt.hash(password, salt);

    try{
        const user = new User(newUser);
        user.save()
        console.log("###",user)
        return user;
    }catch(error){
        console.log(error);
    }
}

async function login(input){
    const { email, password } = input;
    
    const userFound = await User.findOne({ email: email.toLowerCase() });

    if(!userFound) throw new Error("Email o contraseña incorrectos");

    console.log(userFound);

    const passwordSuccess = await bcrypt.compare(password, userFound.password);
    if(!passwordSuccess) throw new Error("Email o contraseña incorrectos");

    return {
        token: createToken(userFound, process.env.SECRET_KEY, "24h")
    };
}

async function getUser(id, username){
    let user = null;
    if(id) user = await User.findById(id);
    if(username) user = await User.findOne({ username });
    if(!user) throw new Error("El usuario no existe");

    return user;
}


module.exports = {
    register,
    login,
    getUser
}