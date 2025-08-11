const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ~!@#$%^&*(){}[],.?'\|"
const charToToken={}
const tokenToChar ={}

characters.split("").forEach((char,index)=>{
    charToToken[char] = index + 1
    tokenToChar[index + 1] = char 
})
function encode(prompt){
    return prompt.split("").map(char => charToToken[char])
}
function decode(tokens){
    return tokens.map(tokens => tokenToChar[tokens]).join("")
}

let prompt = "Hello!!, Welcome to the GenAi With JS Cohort"
let tokenOfPrompt = encode(prompt)
console.log("My Prompt :" ,prompt)
console.log("Pompt in form of Tokens : ",tokenOfPrompt)
console.log("Tokens converted back to Prompt : ", decode(tokenOfPrompt))