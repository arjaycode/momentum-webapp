# Gmail SMTP Configuration for Password Reset Emails

## ⚠️ IMPORTANT: Common Error Fix

If you're getting **"Username and Password not accepted"** error, follow these steps:

### Quick Fix Checklist:
1. ✅ **2-Step Verification MUST be enabled** - This is REQUIRED
2. ✅ **Use App Password, NOT your regular Gmail password**
3. ✅ **No quotes around the password in .env file**
4. ✅ **No spaces before or after the password**
5. ✅ **App Password is exactly 16 characters** (no spaces between characters)

---

## Step 1: Enable 2-Step Verification on Your Gmail Account

**⚠️ THIS IS MANDATORY - You cannot use App Passwords without 2-Step Verification!**

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", find **2-Step Verification**
4. If it says "Off", click it and follow the prompts to enable it
5. You'll need to verify your phone number

**Note:** If you don't see "App passwords" option, it means 2-Step Verification is not enabled yet.

---

## Step 2: Generate an App Password

**⚠️ You MUST use an App Password, NOT your regular Gmail password!**

1. Go to: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → App passwords
2. You may need to sign in again
3. Under "Select app", choose **Mail**
4. Under "Select device", choose **Other (Custom name)**
5. Type "Habit Tracker" (or any name you prefer)
6. Click **Generate**
7. **IMPORTANT:** Copy the 16-character password that appears
   - It will look like: `abcd efgh ijkl mnop` (with spaces)
   - **Remove all spaces** when adding to .env: `abcdefghijklmnop`
   - Or copy it exactly as shown (Laravel will handle spaces, but it's safer without)

---

## Step 3: Configure Your .env File

**⚠️ CRITICAL: Follow these exact steps!**

1. Open your `.env` file in the project root
2. Find or add these lines (make sure there are NO quotes around values):

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=lorenzekua@gmail.com
MAIL_PASSWORD=abcdefghijklmnop
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=lorenzekua@gmail.com
MAIL_FROM_NAME="Habit Tracker"
```

**⚠️ IMPORTANT NOTES:**
- Replace `lorenzekua@gmail.com` with your actual Gmail address (no quotes)
- Replace `abcdefghijklmnop` with your 16-character App Password (no quotes, no spaces)
- **DO NOT** put quotes around MAIL_PASSWORD
- **DO NOT** use your regular Gmail password
- Make sure there are no spaces before or after the `=` sign
- Make sure there are no trailing spaces at the end of lines

**Example of CORRECT format:**
```env
MAIL_PASSWORD=abcd efgh ijkl mnop
```
OR (better, remove spaces):
```env
MAIL_PASSWORD=abcdefghijklmnop
```

**Example of WRONG format:**
```env
MAIL_PASSWORD="abcd efgh ijkl mnop"    ❌ No quotes!
MAIL_PASSWORD = abcd efgh ijkl mnop    ❌ No spaces around =
MAIL_PASSWORD=abcd efgh ijkl mnop      ⚠️  Has spaces (might work, but risky)
```

---

## Step 4: Clear Configuration Cache

**⚠️ You MUST do this after changing .env file!**

Run these commands in your terminal (in the project directory):

```bash
php artisan config:clear
php artisan cache:clear
```

Or if you're using XAMPP on Windows:
```bash
cd C:\xampp\htdocs\momentum-webapp
php artisan config:clear
php artisan cache:clear
```

---

## Step 5: Verify Your Setup

Before testing, verify your .env file:

1. **Check MAIL_USERNAME** - Should be your full Gmail address
2. **Check MAIL_PASSWORD** - Should be exactly 16 characters (App Password)
3. **Check for quotes** - No quotes around password
4. **Check for spaces** - No spaces around the `=` sign
5. **Check 2-Step Verification** - Must be enabled in Google Account

---

## Step 6: Test the Email

1. Go to the forgot password page: `/forgot-password`
2. Enter your email address: `lorenzekua@gmail.com`
3. Click "Send Reset Link"
4. Check your Gmail inbox (and spam folder) for the reset link

---

## Troubleshooting "Username and Password not accepted" Error

### ✅ Solution 1: Verify 2-Step Verification is Enabled

1. Go to: https://myaccount.google.com/security
2. Check if "2-Step Verification" shows "On"
3. If it's "Off", enable it first (Step 1 above)

### ✅ Solution 2: Generate a NEW App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Delete any old "Habit Tracker" app passwords
3. Generate a NEW App Password
4. Copy it immediately (you can't see it again!)
5. Update your .env file with the new password
6. Run: `php artisan config:clear`

### ✅ Solution 3: Check .env File Format

Open your `.env` file and verify:

```env
# CORRECT ✅
MAIL_USERNAME=lorenzekua@gmail.com
MAIL_PASSWORD=abcdefghijklmnop

# WRONG ❌
MAIL_USERNAME="lorenzekua@gmail.com"
MAIL_PASSWORD="abcdefghijklmnop"
MAIL_PASSWORD = abcdefghijklmnop
MAIL_PASSWORD= abcdefghijklmnop
MAIL_PASSWORD=abcdefghijklmnop 
```

### ✅ Solution 4: Remove Spaces from App Password

If your App Password has spaces like `abcd efgh ijkl mnop`:
- Option A: Remove all spaces: `abcdefghijklmnop`
- Option B: Keep spaces but make sure no quotes: `MAIL_PASSWORD=abcd efgh ijkl mnop`

### ✅ Solution 5: Check Gmail Account Status

1. Make sure your Gmail account is active
2. Check if there are any security alerts in your Google Account
3. Try logging into Gmail in a browser to verify the account works

### ✅ Solution 6: Use Alternative Port

If port 587 doesn't work, try port 465 with SSL:

```env
MAIL_PORT=465
MAIL_ENCRYPTION=ssl
```

Then run: `php artisan config:clear`

---

## Alternative: Using Mailtrap for Testing (No Gmail Setup Needed)

If you want to test emails without configuring Gmail:

1. Sign up for free at: https://mailtrap.io/
2. Go to Email Testing → Inboxes → SMTP Settings
3. Copy the credentials
4. Update your .env file:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-mailtrap-username
MAIL_PASSWORD=your-mailtrap-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=test@example.com
MAIL_FROM_NAME="Habit Tracker"
```

5. Run: `php artisan config:clear`
6. Test - emails will appear in Mailtrap inbox (not real emails)

---

## Still Having Issues?

1. **Check Laravel Logs**: `storage/logs/laravel.log`
2. **Verify .env is being read**: Run `php artisan config:show mail`
3. **Test SMTP manually**: Use a tool like PHPMailer or check Gmail activity log
4. **Contact Support**: If all else fails, the issue might be with Gmail account restrictions

---

## Quick Reference

**Gmail SMTP Settings:**
- Host: `smtp.gmail.com`
- Port: `587` (TLS) or `465` (SSL)
- Encryption: `tls` or `ssl`
- Username: Your full Gmail address
- Password: 16-character App Password (NOT your regular password)

**Required:**
- ✅ 2-Step Verification enabled
- ✅ App Password generated
- ✅ Correct .env format (no quotes, no extra spaces)
- ✅ Config cache cleared
