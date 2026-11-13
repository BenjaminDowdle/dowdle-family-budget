# Family Budget: setup guide

You will set up three free things: a database (Supabase), a login for each of you, and a web address (hosting). It takes about 20 minutes once. After that, each phone just opens the address and signs in.

## 1. Create the database (Supabase)
1. Go to supabase.com and sign up (free).
2. Click **New project**. Name it `family-budget`, pick a region near Utah (US West), choose a database password and save it somewhere, and keep the Free plan. Wait about 2 minutes for it to finish.
3. In the left menu open **SQL Editor** > **New query**. Open `supabase-setup.sql` from this folder, copy everything, paste it, and click **Run**. It should say "Success".

## 2. Create the two logins
1. Left menu: **Authentication** > **Users** > **Add user** > **Create new user**.
2. Enter your email and a password, and tick **Auto Confirm User**. Click create.
3. Repeat for your wife.
4. Turn off public sign-ups so nobody else can create an account: **Authentication** > **Sign In / Providers** (named **Providers** in some versions) > find **Allow new users to sign up** and switch it off. Save.

## 3. Copy two values into config.js
1. Left menu: **Project Settings** > **API Keys** (or **API**).
2. Copy the **Project URL** and the **Publishable key** (older projects call it the **anon** key).
3. Open `config.js` in Notepad. Paste the URL and key between the quotes. Save.

Both values are meant to be public. Your data is protected by the logins and the database rules in the SQL file.

## 4. Put the folder online
Easiest: **Netlify Drop**.
1. Go to app.netlify.com/drop and drag this whole folder onto the page.
2. You get a web address like `https://something.netlify.app`. Create a free Netlify account when it asks, so the site stays up.
3. Optional: in Site configuration, rename the site to something easy to type.

Alternative: GitHub Pages. Create a repository, upload these files, then Settings > Pages > deploy from the main branch.

## 5. Install on each phone (Android)
1. Open your web address in Chrome and sign in with that person's email and password.
2. On your phone, when you see "Your database is empty", tap **Start empty**.
3. Chrome menu (three dots) > **Install app** (or **Add to Home screen**).

Your wife does the same with her login, and she will see everything you have entered.

## Moving data from the Claude version
If you entered real numbers in the Claude-hosted version: open it, go to **Data** > **Copy backup**. In the new app go to **Data**, paste into the Backup box, and tap **Load pasted backup**.

## Updating the app later
Replace the files on your hosting. If a phone still shows the old version, change `VERSION` in `sw.js` (for example `budget-v2`) before uploading.

## Good to know
- Free Supabase projects pause after about a week with no activity. Using the app regularly keeps it awake. If it pauses, open the project in Supabase and click Restore.
- It works offline. Changes you make without signal are saved on the phone and sent when it reconnects.
- Changes from the other phone show up within about 10 seconds.
- **Data** > **Sign out and clear this device** removes the app's data from that phone.
