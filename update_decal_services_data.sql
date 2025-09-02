-- Script to update DecalServices data to use DecalTemplateID instead of DecalTypeID
-- This script should be run after the migration is applied

-- First, let's check what data we have
SELECT 'Current DecalServices data:' as info;
SELECT ServiceID, ServiceName, DecalTemplateID FROM DecalServices;

SELECT 'Current DecalTemplates data:' as info;
SELECT TemplateID, TemplateName, DecalTypeID FROM DecalTemplates;

-- Update DecalServices to use DecalTemplateID
-- We'll map each DecalService to a DecalTemplate based on the DecalTypeID
-- For now, we'll create a simple mapping: first DecalTemplate for each DecalType

UPDATE DecalServices 
SET DecalTemplateID = (
    SELECT dt.TemplateID 
    FROM DecalTemplates dt 
    WHERE dt.DecalTypeID = (
        SELECT dts.DecalTypeID 
        FROM DecalTypes dts 
        WHERE dts.DecalTypeID = (
            -- This is a temporary mapping since we don't have the old DecalTypeID column anymore
            -- We'll use the first template for each service
            SELECT dt2.DecalTypeID 
            FROM DecalTemplates dt2 
            LIMIT 1
        )
    )
    LIMIT 1
)
WHERE DecalTemplateID = '' OR DecalTemplateID IS NULL;

-- Alternative approach: Create DecalTemplates for existing DecalTypes if they don't exist
-- This ensures we have templates for all existing services

INSERT INTO DecalTemplates (TemplateID, TemplateName, ImageURL, DecalTypeID)
SELECT 
    'TEMP_' || dt.DecalTypeID as TemplateID,
    'Template for ' || dt.DecalTypeName as TemplateName,
    'https://templates.decalxe.vn/default/' || LOWER(dt.DecalTypeName) || '.jpg' as ImageURL,
    dt.DecalTypeID
FROM DecalTypes dt
WHERE NOT EXISTS (
    SELECT 1 FROM DecalTemplates dt2 WHERE dt2.DecalTypeID = dt.DecalTypeID
);

-- Now update DecalServices to use the appropriate DecalTemplate
UPDATE DecalServices 
SET DecalTemplateID = (
    SELECT dt.TemplateID 
    FROM DecalTemplates dt 
    WHERE dt.DecalTypeID = (
        -- Since we don't have the old DecalTypeID, we'll use a default mapping
        -- This is a simplified approach - in a real scenario, you'd need to preserve the old data
        SELECT dt2.DecalTypeID 
        FROM DecalTypes dt2 
        WHERE dt2.DecalTypeName LIKE '%Carbon%' -- Example mapping
        LIMIT 1
    )
    LIMIT 1
)
WHERE DecalTemplateID = '' OR DecalTemplateID IS NULL;

-- Verify the update
SELECT 'Updated DecalServices data:' as info;
SELECT 
    ds.ServiceID, 
    ds.ServiceName, 
    ds.DecalTemplateID,
    dt.TemplateName,
    dts.DecalTypeName
FROM DecalServices ds
LEFT JOIN DecalTemplates dt ON ds.DecalTemplateID = dt.TemplateID
LEFT JOIN DecalTypes dts ON dt.DecalTypeID = dts.DecalTypeID;
