import { hashPassword } from '../utils/authUtil.js';
import { User } from '../models/user.js';
import './DBConnect.js';
const seedDatabase = async () => {
  try {
    await seedAdmin();
    await seedStaff();
    await seedUsers();

    console.log('Database seeding completed');
    process.exit(0);
  } catch (err) {
    console.error(`DB Seeding Error: ${err.message}`);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    const admin = await User.findOne({ username: 'admin' });

    if (!admin) {
      await User.create({
        username: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('admin123'), // You should hash the password in a real application
        roles: ['admin'],
      });

      console.log('Admin account seeded successfully');
    } else {
      console.log('Admin account already exists');
    }
  } catch (error) {
    console.error(`Error seeding admin account: ${error.message}`);
  }
};
const seedStaff = async () => {
  try {
    const staff = await User.findOne({ username: 'staff' });

    if (!staff) {
      await User.create({
        username: 'staff',
        email: 'staff@gmail.com',
        password: await hashPassword('staff123'), // You should hash the password in a real application
        roles: ['staff'],
      });

      console.log('Staff account seeded successfully');
    } else {
      console.log('Staff account already exists');
    }
  } catch (error) {
    console.error(`Error seeding admin account: ${error.message}`);
  }
};
const seedUsers = async () => {
  try {
    const user = await User.findOne({ username: 'user' });

    if (!user) {
      await User.create({
        username: 'user',
        email: 'user@gmail.com',
        password: await hashPassword('user123'), // You should hash the password in a real application
        roles: ['user'],
      });

      console.log('User account seeded successfully');
    } else {
      console.log('User account already exists');
    }
  } catch (error) {
    console.error(`Error seeding admin account: ${error.message}`);
  }
};

seedDatabase();
