const { OpenAI } = require("openai");
const { openaiSecret } = require("./config");
const axios = require('axios');


const openai = new OpenAI({ apiKey: openaiSecret });

async function postRequest() {
  try {
    const embedding = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: "The quick brown fox jumped over the lazy dog",
      encoding_format: "float",
    });

    console.log(embedding);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function getEmbedding(text) {
  try {
    const request = await axios.post(
      'https://api.openai.com/v1/embeddings',
      {
        input: "text",
        model: 'text-embedding-ada-002',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiSecret}`,
        },
      }
    );
    const response = request; // Accessing response data from axios
    if (response.status = 200 && response.statusText == "OK") {
      return { ok: true, data: response.data.data[0] }
    } else {
      return { ok: false, message: response.message }
    }
  } catch (error) {
    return { ok: false, message: error.message }
  }
}





module.exports = { postRequest, getEmbedding }
