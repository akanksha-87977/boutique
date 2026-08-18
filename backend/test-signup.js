const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function testSignup() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const testEmail = `test${Date.now()}@example.com`;
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: testEmail,
      password: 'password123'
    };

    console.log('\n📝 Creating test user:', testData);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testData.password, salt);

    // Create user
    const user = new User({
      firstName: testData.firstName,
      lastName: testData.lastName,
      email: testData.email,
      password: hashedPassword,
      joinDate: new Date()
    });

    // Save to database
    await user.save();
    console.log('✅ User created successfully!');
    console.log('📊 User data:', {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      joinDate: user.joinDate
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testSignup();
