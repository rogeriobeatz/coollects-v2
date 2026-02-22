-- Migration script from MySQL coollects to PostgreSQL coollects v2
-- This script is designed to be run once to migrate existing data

-- Step 1: Create temporary tables to hold old data structure
-- Note: This assumes your old MySQL structure had users, items, collections, etc.

-- Step 2: Migrate Users
-- INSERT INTO "User" (id, name, email, "emailVerified", "createdAt", "updatedAt")
-- SELECT id, name, email, NULL, created_at, updated_at FROM temp_old_users;

-- Step 3: Migrate Items
-- INSERT INTO "Item" (id, "userId", name, description, "imageUrl", color, brand, model, year, series, "createdAt", "updatedAt")
-- SELECT id, user_id, name, description, image_url, color, brand, model, year, series, created_at, updated_at FROM temp_old_items;

-- Step 4: Migrate Collections
-- INSERT INTO "Collection" (id, "userId", name, description, "imageUrl", "isPublic", "createdAt", "updatedAt")
-- SELECT id, user_id, name, description, image_url, is_public, created_at, updated_at FROM temp_old_collections;

-- Step 5: Migrate Collection Items (many-to-many)
-- INSERT INTO "CollectionItem" ("collectionId", "itemId", "addedAt")
-- SELECT collection_id, item_id, added_at FROM temp_old_collection_items;

-- Notes:
-- 1. Make sure to update the field names to match your actual MySQL schema
-- 2. Run this after setting up Prisma in PostgreSQL
-- 3. Adjust the id fields based on whether you're using UUIDs or numeric IDs
-- 4. Consider the password field - if passwords are stored as plain text, hash them first!
-- 5. Use data transformation scripts (Python/Node.js) for complex migrations

-- After migration, verify:
-- SELECT COUNT(*) FROM "User";
-- SELECT COUNT(*) FROM "Item";
-- SELECT COUNT(*) FROM "Collection";
