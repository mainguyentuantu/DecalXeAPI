-- Verification queries for DecalService architecture refactor
-- Run these queries after migration to verify data integrity

-- 1. Check that all DecalServices have DecalTemplateID
SELECT 'DecalServices without DecalTemplateID' as check_name, COUNT(*) as count
FROM "DecalServices" 
WHERE "DecalTemplateID" IS NULL;

-- 2. Check relationship integrity - DecalService -> DecalTemplate
SELECT 'DecalServices with invalid DecalTemplateID' as check_name, COUNT(*) as count
FROM "DecalServices" ds
LEFT JOIN "DecalTemplates" dt ON ds."DecalTemplateID" = dt."DecalTemplateID"
WHERE dt."DecalTemplateID" IS NULL;

-- 3. Check relationship integrity - DecalTemplate -> DecalType
SELECT 'DecalTemplates with invalid DecalTypeID' as check_name, COUNT(*) as count
FROM "DecalTemplates" dt
LEFT JOIN "DecalTypes" dtype ON dt."DecalTypeID" = dtype."DecalTypeID"
WHERE dtype."DecalTypeID" IS NULL;

-- 4. Verify we can access DecalType through DecalTemplate
SELECT 
    ds."DecalServiceID",
    ds."ServiceName",
    dt."TemplateName",
    dtype."DecalTypeName"
FROM "DecalServices" ds
JOIN "DecalTemplates" dt ON ds."DecalTemplateID" = dt."DecalTemplateID"
JOIN "DecalTypes" dtype ON dt."DecalTypeID" = dtype."DecalTypeID"
LIMIT 5;

-- 5. Check that no orphaned DecalServices exist
SELECT 'Orphaned DecalServices' as check_name, COUNT(*) as count
FROM "DecalServices" ds
LEFT JOIN "DecalTemplates" dt ON ds."DecalTemplateID" = dt."DecalTemplateID"
WHERE dt."DecalTemplateID" IS NULL;

-- 6. Verify DecalTemplate has DecalServices navigation
SELECT 
    dt."DecalTemplateID",
    dt."TemplateName",
    COUNT(ds."DecalServiceID") as service_count
FROM "DecalTemplates" dt
LEFT JOIN "DecalServices" ds ON dt."DecalTemplateID" = ds."DecalTemplateID"
GROUP BY dt."DecalTemplateID", dt."TemplateName"
ORDER BY service_count DESC
LIMIT 10;

-- 7. Check DecalType statistics through new relationship
SELECT 
    dtype."DecalTypeID",
    dtype."DecalTypeName",
    COUNT(DISTINCT dt."DecalTemplateID") as template_count,
    COUNT(ds."DecalServiceID") as service_count
FROM "DecalTypes" dtype
LEFT JOIN "DecalTemplates" dt ON dtype."DecalTypeID" = dt."DecalTypeID"
LEFT JOIN "DecalServices" ds ON dt."DecalTemplateID" = ds."DecalTemplateID"
GROUP BY dtype."DecalTypeID", dtype."DecalTypeName"
ORDER BY service_count DESC;