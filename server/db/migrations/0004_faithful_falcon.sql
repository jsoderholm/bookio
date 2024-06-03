CREATE TABLE IF NOT EXISTS "events_on_groups" (
	"event_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	CONSTRAINT "events_on_groups_event_id_group_id_pk" PRIMARY KEY("event_id","group_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_on_groups" (
	"user_id" text NOT NULL,
	"group_id" integer NOT NULL,
	CONSTRAINT "users_on_groups_user_id_group_id_pk" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
DROP TABLE "events_to_groups";--> statement-breakpoint
DROP TABLE "users_to_groups";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_on_groups" ADD CONSTRAINT "events_on_groups_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_on_groups" ADD CONSTRAINT "events_on_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_on_groups" ADD CONSTRAINT "users_on_groups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_on_groups" ADD CONSTRAINT "users_on_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
