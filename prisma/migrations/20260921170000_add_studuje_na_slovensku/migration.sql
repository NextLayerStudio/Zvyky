-- The 2026 žiadosť form adds the question "Študujem na území Slovenskej republiky
-- aspoň šesť mesiacov — áno / nie". Nullable so existing registrations stay untouched.
ALTER TABLE "Registration" ADD COLUMN "studujeNaSlovensku" BOOLEAN;
