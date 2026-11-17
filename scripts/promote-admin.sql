-- Promote a local user to the Admin role for the homepage control panel.
-- Replace the mobile number with the account that should operate the panel.
UPDATE identity.users
SET role = 'Admin'
WHERE mobile = '09121234567';
