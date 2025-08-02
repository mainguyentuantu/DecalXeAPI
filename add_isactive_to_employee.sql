-- Add IsActive column to Employee table
-- This script manually applies the AddIsActiveToEmployee migration

-- Check if column already exists before adding
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'Employees' 
        AND column_name = 'IsActive'
    ) THEN
        -- Add IsActive column with default value true
        ALTER TABLE "Employees" 
        ADD COLUMN "IsActive" boolean NOT NULL DEFAULT true;
        
        RAISE NOTICE 'Column IsActive added to Employees table successfully';
    ELSE
        RAISE NOTICE 'Column IsActive already exists in Employees table';
    END IF;
END $$;

-- Update existing employees to have IsActive = true by default
UPDATE "Employees" SET "IsActive" = true WHERE "IsActive" IS NULL;

-- Add comment to the column for documentation
COMMENT ON COLUMN "Employees"."IsActive" IS 'Indicates whether the employee is currently active in the system';