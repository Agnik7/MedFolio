console.log("running")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  }
  
async function diseaseDetails() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Identify the disease in the image. Provide the common name of the disease. Provide only the disease name and nothing else. Also mention the perfect doctor specialist who can treat this.Make the disease and the doctor type a json file.The json should have only two attributes, disease and doctor.Do not give in MARKDOWN format ,just give the json file properly.Remove all backticks from the response strictly.GIVE a JSON FILE STRICTLY.";

  const imageParts = [
    fileToGenerativePart("./controllers/eye.png", "image/*"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(JSON.parse(text));
  return text;
  }
  module.exports = {diseaseDetails};
