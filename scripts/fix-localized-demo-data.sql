-- Local/demo data repair for corrupted Persian/Arabic names created by early
-- seed runs. The application stores only canonical Gregorian dates; this file
-- only repairs localized catalog labels.
--
-- Usage (local development database):
--   docker cp scripts/fix-localized-demo-data.sql hani-postgres:/tmp/fix.sql
--   docker exec hani-postgres psql -U hani -d hani -f /tmp/fix.sql

BEGIN;

UPDATE catalog.destination_translations t
SET name = 'استانبول'
FROM catalog.destinations d
WHERE d.id = t.destination_id
  AND d.slug LIKE 'istanbul%'
  AND t.locale = 'fa'
  AND t.name LIKE '%?%';

UPDATE catalog.destination_translations t
SET name = 'إسطنبول'
FROM catalog.destinations d
WHERE d.id = t.destination_id
  AND d.slug LIKE 'istanbul%'
  AND t.locale = 'ar'
  AND t.name LIKE '%?%';

UPDATE catalog.hotel_translations t
SET name = 'هتل آزمایشی حسابرسی'
FROM catalog.hotels h
WHERE h.id = t.hotel_id
  AND h.slug = 'audit-test-hotel'
  AND t.locale = 'fa';

UPDATE catalog.hotel_translations t
SET name = 'هتل گالری گیت ۵'
FROM catalog.hotels h
WHERE h.id = t.hotel_id
  AND h.slug = 'gate5-gallery-hotel'
  AND t.locale = 'fa';

UPDATE catalog.tour_product_translations t
SET title = 'تور استانبول ۴ شب'
FROM catalog.tour_products p
WHERE p.id = t.tour_product_id
  AND p.slug = 'istanbul-4-nights'
  AND t.locale = 'fa';

UPDATE catalog.tour_product_translations t
SET title = 'إسطنبول ٤ ليال'
FROM catalog.tour_products p
WHERE p.id = t.tour_product_id
  AND p.slug = 'istanbul-4-nights'
  AND t.locale = 'ar';

UPDATE catalog.tour_product_translations t
SET title = 'تور استانبول'
FROM catalog.tour_products p
WHERE p.id = t.tour_product_id
  AND p.slug LIKE 'istanbul-%'
  AND p.slug <> 'istanbul-4-nights'
  AND t.locale = 'fa'
  AND t.title LIKE '%?%';

UPDATE catalog.tour_product_translations t
SET title = 'جولة إسطنبول'
FROM catalog.tour_products p
WHERE p.id = t.tour_product_id
  AND p.slug LIKE 'istanbul-%'
  AND p.slug <> 'istanbul-4-nights'
  AND t.locale = 'ar'
  AND t.title LIKE '%?%';

-- Probe products are test artifacts and must not be public.
UPDATE catalog.tour_products
SET status = 'Draft'
WHERE slug LIKE 'probe-%'
  AND status = 'Published';

COMMIT;
