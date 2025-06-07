require('dotenv').config();
const mongoose = require('mongoose');
const { OpenAI } = require('openai');

async function testSetup() {
    console.log('Testing setup...\n');

    // Test MongoDB Connection
    console.log('1. Testing MongoDB connection...');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully!\n');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        return;
    }

    // Test OpenAI API
    console.log('2. Testing OpenAI API...');
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Say 'Hello, setup test successful!'" }],
        });
        console.log('✅ OpenAI API working! Response:', completion.choices[0].message.content, '\n');
    } catch (error) {
        console.error('❌ OpenAI API test failed:', error.message);
    }

    // Test JWT Secret
    console.log('3. Testing JWT Secret...');
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length > 10) {
        console.log('✅ JWT Secret is set and secure!\n');
    } else {
        console.error('❌ JWT Secret is not properly set!\n');
    }

    // Test Google Search Engine ID
    console.log('4. Testing Google Search Engine ID...');
    if (process.env.GOOGLE_SEARCH_ENGINE_ID) {
        console.log('✅ Google Search Engine ID is set!\n');
    } else {
        console.error('❌ Google Search Engine ID is not set!\n');
    }

    console.log('Setup test completed!');
    process.exit(0);
}

testSetup(); 