# Gmail SMTP Setup for Password Reset Emails

## Overview
This guide helps you configure Gmail SMTP to send password reset emails in your Node.js backend.

---

## Step 1: Enable 2-Factor Authentication on Gmail Account

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Scroll to **"Your Google Account"** section
3. Find **"2-Step Verification"** and click **"Enable"**
4. Follow Google's instructions to verify your phone number

---

## Step 2: Generate Gmail App Password

1. After enabling 2FA, go back to [Google Account Security](https://myaccount.google.com/security)
2. Look for **"App passwords"** (it appears only after 2FA is enabled)
3. Select **"Mail"** and **"Windows Computer"** (or your OS)
4. Google will generate a 16-character password
5. **Copy this password** - you'll need it for `.env`

**Example:** `abcd efgh ijkl mnop` (without spaces when storing)

---

## Step 3: Update Backend `.env` File

Create or update `.env` in the `backend/` folder with:

```
MONGO_URI=mongodb://localhost:27017/videocall
ACCESS_SECRET=your_access_secret_key_here
REFRESH_SECRET=your_refresh_secret_key_here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
FRONTEND_URL=http://localhost:5173
PORT=5000
```

**Replace:**
- `your-email@gmail.com` → Your actual Gmail address
- `abcdefghijklmnop` → The 16-char password from Step 2 (remove spaces)

---

## Step 4: How It Works in Code

### `forgotPassword` endpoint:
- User sends their email to `/api/auth/forgot-password`
- Backend generates a secure reset token
- Hashes token and stores in DB with 1-hour expiry
- Sends email with reset link containing the raw token

### `resetPassword` endpoint:
- User receives reset link, enters new password
- Frontend submits token + new password to `/api/auth/reset-password`
- Backend verifies token hash matches stored hash and hasn't expired
- Updates password if valid, clears reset token (single-use only)

### `sendResetEmail` function:
- Uses Gmail SMTP service (no Ethereal needed)
- Authenticates with `EMAIL_USER` and `EMAIL_PASS`
- Sends HTML email with a clickable reset link
- Logs success/error to console

---

## Step 5: Test the Flow

### 1. Start Backend Server
```bash
cd backend
npm start
```

### 2. Call Forgot Password API
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com"}'
```

### 3. Check Your Inbox
- Look for email from Gmail with subject: **"Password Reset Request"**
- Click the link or copy it to test reset

### 4. Reset Password
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"[token-from-email]","newPassword":"newPassword123"}'
```

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| **Email not sending** | Check `EMAIL_USER` and `EMAIL_PASS` are correct in `.env` |
| **"Invalid credentials" error** | Ensure 2FA is enabled and you used the **App Password**, not Gmail password |
| **Email goes to spam** | Gmail trusts its own addresses; check spam folder first |
| **"Cannot find module nodemailer"** | Run `npm install nodemailer` in backend folder |
| **Token expired in email** | Reset token expires in 1 hour; generate new one |

---

## User Model Requirements

Your `User` schema must include:
```javascript
resetToken: String,        // Hashed reset token
resetTokenExpire: Date     // Token expiry timestamp
```

Ensure these fields exist in [models/User.js](../models/User.js).

---

## Important Security Notes

✅ **What we're doing right:**
- Reset token is hashed before storing in DB
- Token expires after 1 hour
- Token is single-use (cleared after password reset)
- Password is hashed with bcrypt before saving

⚠️ **What to improve for production:**
- Use HTTPS only (set `secure: true` in cookies when deployed)
- Rate-limit the `/forgot-password` endpoint to prevent spam
- Add CAPTCHA to password reset form
- Use environment-specific `.env` files (never commit `.env`)
- Consider email verification before allowing password reset
