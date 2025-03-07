const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send('Code is required');
    }

    try {
        const apiKey = process.env.GOOGLE_GEMINI_KEY;  // Load API key from environment variable

        if (!apiKey) {
            return res.status(500).send('AI Service API key is missing. Contact admin.');
        }

        const response = await aiService(code, apiKey); // Pass API key to the service
        return res.send(response);  
    } catch (error) {
        console.error('AI Service Error:', error);
        return res.status(500).send('Internal Server Error');
    }
};
