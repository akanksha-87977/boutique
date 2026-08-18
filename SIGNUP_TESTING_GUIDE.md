# Signup Troubleshooting & Testing Guide

## What I Fixed

### 1. **Added Error/Success Alert Styling** (App.css)
   - `.error-alert` - Red background for error messages
   - `.success-alert` - Green background for success messages
   - Added border-radius to inputs and buttons for better UX
   - Added disabled state styling for the submit button

### 2. **Enhanced Console Logging** (SignUp.jsx)
   - Now logs the request data being sent
   - Logs the response status and data
   - Better error messages with actual error details

### 3. **Fixed Button States**
   - Button shows "Creating Account..." while loading
   - Button is disabled during signup to prevent double-submission
   - Proper error handling with user feedback

## How to Test Signup

### Prerequisites
- ✅ Backend server running on port 5000 (check terminal output)
- ✅ Frontend running on port 3001 or 3002
- ✅ MongoDB connected (you should see ✅ MongoDB Connected message)

### Step-by-Step Testing

1. **Open the app** in your browser
   - Frontend: `http://localhost:3001` (or 3002)

2. **Navigate to Sign Up**
   - Click "Sign Up" button in the header or on the Sign In page

3. **Fill the form with test data:**
   ```
   First Name: John
   Last Name: Doe
   Email: john.doe@test.com
   Password: password123
   Confirm Password: password123
   ```

4. **Click "Create Account"**
   - Button should show "Creating Account..." (greyed out)
   - Should show success message or error message

5. **Check Browser Console** (F12 or Right-click → Inspect)
   - Should see console logs like:
   ```
   Submitting signup: {firstName: "John", lastName: "Doe", email: "john.doe@test.com", password: "password123"}
   Response status: 201
   Response data: {message: "User registered successfully", user: {...}}
   ```

## Possible Issues & Solutions

### Issue: "Cannot GET /api" error
**Solution:** Already fixed! Added root API endpoint.

### Issue: "Connection error" message
**Causes:**
1. Backend server not running on port 5000
2. CORS issue - Backend not allowing requests
3. MongoDB connection failed

**Check:**
```
Terminal shows: ✅ MongoDB Connected: ...
Browser console shows: Response status: 201
```

### Issue: "Email already registered"
**Solution:** Use a different email address - the email is already in the database

### Issue: Form doesn't submit
**Check:**
1. Browser console for errors (F12)
2. Validation errors - all fields must be filled correctly
3. Password must be at least 6 characters
4. Passwords must match

## Verify Data in MongoDB

After successful signup, check MongoDB Atlas:

1. Go to: https://cloud.mongodb.com
2. Login to your account
3. Navigate: Cluster0 → Collections → aura_boutique → users
4. You should see a new user document with:
   - firstName, lastName, email
   - password (hashed - appears as random characters)
   - joinDate, createdAt, updatedAt

## Backend Endpoints

- **POST /api/auth/signup** - Register new user
  - Request body: `{firstName, lastName, email, password}`
  - Response: `{message, user: {id, firstName, lastName, email, joinDate}}`

- **POST /api/auth/signin** - Login user
  - Request body: `{email, password}`
  - Response: `{message, user: {id, firstName, lastName, email, joinDate}}`

## Next Steps After Signup Works

1. Implement SignIn functionality
2. Add JWT tokens for authentication
3. Protect authenticated routes
4. Add password reset functionality
5. Add email verification

---

If signup still doesn't work:
1. Check backend terminal for error messages
2. Open browser DevTools (F12) and check Console tab
3. Check Network tab to see the actual HTTP request/response
4. Verify backend is running with `curl http://localhost:5000/api`
