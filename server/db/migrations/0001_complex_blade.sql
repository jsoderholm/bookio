ALTER TABLE "users"
ADD COLUMN "profile_picture" text;
--> statement-breakpoint
ALTER TABLE "users"
ADD COLUMN "created_at" timestamp DEFAULT now();