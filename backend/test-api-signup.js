const mongoose = require('mongoose');
require('dotenv').config();

async function testSignupViaAPI() {
  try {
    console.log('🧪 Testing signup via direct API call...\n');

    const email = `test-${Date.now()}@example.com`;
    const signupData = {
      firstName: 'Direct',
      lastName: 'Test',
      email: email,
      password: 'password123'
    };

    console.log('📝 Sending request to: http://localhost:5000/api/auth/signup');
    console.log('📤 Data:', signupData);

    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    });

    console.log('\n📊 Response Status:', response.status);
    console.log('📊 Response Status Text:', response.statusText);

    const data = await response.json();
    console.log('\n📊 Response Body:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ Signup successful via API!');
    } else {
      console.log('\n❌ Signup failed!');
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testSignupViaAPI();
