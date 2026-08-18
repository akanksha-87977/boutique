const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

async function checkUsers() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    console.log('📍 URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('📊 Collections:', await mongoose.connection.db.listCollections().toArray());

    // Count all users
    const userCount = await User.countDocuments();
    console.log('\n👥 Total users in database:', userCount);

    // Get all users
    const users = await User.find({}, { password: 0 }); // Exclude password from display
    
    if (users.length === 0) {
      console.log('\n❌ No users found in database!');
    } else {
      console.log('\n✅ All users in database:');
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. User:`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Name: ${user.firstName} ${user.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Join Date: ${user.joinDate}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log(`   Updated: ${user.updatedAt}`);
      });
    }

    // Show collection info
    const userCollection = mongoose.connection.collection('users');
    const stats = await userCollection.stats();
    console.log('\n📈 Collection stats:');
    console.log(`   Total documents: ${stats.count}`);
    console.log(`   Average document size: ${stats.avgObjSize} bytes`);
    console.log(`   Storage size: ${stats.storageSize} bytes`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
