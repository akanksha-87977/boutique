# Signup Debugging Checklist

## Step 1: Verify Backend is Running

✅ Check terminal for:
```
🚀 Server running on port 5000
✅ MongoDB Connected: ...
```

## Step 2: Test Backend API Directly

Run this in the backend folder:
```bash
node test-signup.js
```

Expected output:
```
✅ Connected to MongoDB
✅ User created successfully!
```

If this works, MongoDB and the User model are fine.

## Step 3: Clear Frontend Cache & Restart

1. Stop frontend (Ctrl+C)
2. Clear cache: `npm start -- --reset-cache`
3. Or delete node_modules and reinstall: `npm install`

## Step 4: Test Signup & Check Browser Console

1. Open http://localhost:3001
2. Go to Sign Up page
3. Open Browser DevTools (F12)
4. Click Console tab
5. Fill form and submit
6. Watch the console for logs:
   ```
   📝 Submitting signup: {...}
   🔗 Calling: http://localhost:5000/api/auth/signup
   📊 Response status: 201
   ✅ Signup successful!
   ```

## Step 5: Check Network Tab

1. In DevTools, click Network tab
2. Submit signup form
3. Look for `/api/auth/signup` request
4. Click it and check:
   - **Request headers** - should have Content-Type: application/json
   - **Request body** - should have firstName, lastName, email, password
   - **Response** - should show status 201 and user data

## Step 6: Backend Terminal Output

While testing in browser, watch the backend terminal. You should see:
```
📝 Signup request received: {...}
🔍 Checking if user already exists: john@example.com
🔐 Hashing password...
💾 Creating new user document...
📤 Saving user to MongoDB...
✅ User created successfully: 66abc123...
```

## Common Issues

### Issue: "Cannot POST /api/auth/signup"
- Backend is not running
- Check port 5000 is open
- Backend crashed - check terminal

### Issue: "CORS Error" 
- Check server.js has `app.use(cors())`
- Restart backend

### Issue: "Email already registered"
- Use a new email like: `test+${Date.now()}@example.com`
- Or check MongoDB and delete duplicate

### Issue: Form shows loading but no response
- Check Network tab for the request
- Check backend terminal for error logs
- Verify MongoDB is connected

## Quick Fix If Still Having Issues

1. **Kill all processes:**
   ```bash
   Get-Process -Name "node" | Stop-Process -Force
   ```

2. **Restart backend:**
   ```bash
   cd src/components/backend
   node server.js
   ```

3. **Restart frontend:**
   ```bash
   npm start
   ```

4. **Test again**

---

If you still have issues, share the output from:
1. Backend terminal (the logs when you submit)
2. Browser console (F12 → Console tab)
3. Network tab response (F12 → Network → click signup request → Response tab)
