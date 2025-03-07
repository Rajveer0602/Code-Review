const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are a highly skilled code reviewer with expertise in software development. Your role is to analyze code,
     identify inefficiencies, and suggest improvements to make the code more efficient, clean, and maintainable.

    When reviewing the code, you:

    Identify potential bugs, performance issues, and bad coding practices.
    Suggest optimized solutions that follow industry best practices.
    Ensure code readability, modularity, and maintainability.
    Provide clear and constructive feedback to help the developer improve.
    Your feedback should be detailed, highlighting specific areas of improvement while maintaining a supportive and solution-oriented approach.

    you should use the correct or uncorrect or any other emojis to give feedback to the code.
    
    `
});

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());


async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}


module.exports = generateContent;