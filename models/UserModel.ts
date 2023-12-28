import { Schema, model, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

// Define the structure of a user document in the MongoDB collection
type User = {
  name: string;
  email: string;
  password: string;
  role: string;
};

// Define methods that can be called on a user document
type UserMethods = {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
};

// Define the Mongoose model type, specifying the User type for documents and UserMethods type for document methods
type UserModel = Model<User, {}, UserMethods>;

// Create a Mongoose schema for the User model
const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    // Define the schema for the user document
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      // Use a custom validator to check if the email is valid
      validate: {
        validator: (value: string) => validator.default.isEmail(value),
        message: 'Please provide a valid email',
      },
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Use a pre-save hook to hash the user's password before saving it to the database
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Define a method to compare a candidate password with the stored hashed password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default model<User, UserModel>('User', userSchema);
