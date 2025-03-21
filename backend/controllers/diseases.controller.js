const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const {diseaseAnalyse} = require("../models/diseases.model");
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  }
  const specializations = [
    'Allergist and Immunologist',
    'Anesthesiologist',
    'Dermatologist',
    'Emergency Medicine Specialist',
    'Family Medicine Physician',
    'Internal Medicine Physician',
    'Medical Geneticist',
    'Neurologist',
    'Nuclear Medicine Specialist',
    'Obstetrician and Gynecologist',
    'Ophthalmologist',
    'Pathologist',
    'Pediatrician',
    'Physical Medicine and Rehabilitation Specialist',
    'Preventive Medicine Specialist',
    'Psychiatrist',
    'Radiologist',
    'Surgeon',
    'Urologist',
    'Cardiologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Hematologist',
    'Infectious Disease Specialist',
    'Nephrologist',
    'Oncologist',
    'Pulmonologist',
    'Rheumatologist',
    'General Practitioner'
  ];
  
async function diseaseDetails(req,res) {
  const {textSymptom, imageURL,userEmail, city} = req.body; 
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  let response;
  if(imageURL && !textSymptom)
  {
    const imageParts = [
      imageURL
    ];
    const prompt = "Identify the disease in the image. Provide the common name of the disease. Provide the common name of the disease. Provide only the disease name and nothing else. Also mention the perfect doctor specialist who can treat this. The available specializations are: ${specializations}. Make the disease and the doctor type a json file. The json should have only two attributes, disease and doctor. Do not give in MARKDOWN format, just give the json file properly. Remove all backticks from the response strictly. GIVE a JSON FILE STRICTLY.";
    const result = await model.generateContent([prompt, ...imageParts]);
    response = await result.response;   
  }
  else
  {
    const prompt = `Identify the disease from the following symptoms: ${textSymptom}. Provide the common name of the disease. Provide only the disease name and nothing else. Also mention the perfect doctor specialist who can treat this. The available specializations are: ${specializations}. Make the disease and the doctor type a json file. The json should have only two attributes, disease and doctor. Do not give in MARKDOWN format, just give the json file properly. Remove all backticks from the response strictly. GIVE a JSON FILE STRICTLY.`;
    const result = await model.generateContent(prompt);
    response = await result.response;
  }
  const text = JSON.parse(response.text());
  const doctorData = await diseaseAnalyse({userEmail, text,textSymptom,imageURL,city});
  if(imageURL && !textSymptom)
    return res.status(200).json({success:true,doctorData:doctorData, disease: text.disease, imageURL: imageURL,specialization: text.doctor})
  else
  return res.status(200).json({success:true,doctorData:doctorData, disease: text.disease, specialization: text.doctor})  


  }
  module.exports = {diseaseDetails};