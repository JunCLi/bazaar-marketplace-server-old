exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "bazaar_marketplace"."users" (
      "id" SERIAL PRIMARY KEY,
      "email" VARCHAR(255) NOT NULL,
      "password" VARCHAR(255) NOT NULL,
      "user_date_created" DATE NOT NULL DEFAULT CURRENT_DATE,
			"fullname" VARCHAR(128),
			"user_status" VARCHAR(64),
			"cumulative_rating" FLOAT8
    );
	`),

	pgm.sql(`
		CREATE TABLE "bazaar_marketplace"."items" (
			"id" SERIAL PRIMARY KEY,
			"item_owner_id" INT NOT NULL,
			"item_name" VARCHAR(64) NOT NULL,
			"item_status" VARCHAR(64) NOT NULL,
			"item_price" INT NOT NULL,
			"item_description" TEXT,
			"date_added" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			"cumulative_rating" FLOAT8,
			FOREIGN KEY (item_owner_id) REFERENCES bazaar_marketplace.users (id)
		);
	`),

	pgm.sql(`
		CREATE TABLE "bazaar_marketplace"."sens_transactions" (
			"id" SERIAL PRIMARY KEY,
			"stripe_id" INT NOT NULL
		)
	`),

	pgm.sql(`
		CREATE TABLE "bazaar_marketplace"."transactions" (
			"id" SERIAL PRIMARY KEY,
			"item_id" INT NOT NULL,
			"sens_transaction_id" INT NOT NULL,
			"purchased_by_id" INT NOT NULL,
			"purchased_from_id" INT NOT NULL,
			"status" VARCHAR(64) NOT NULL,
			"date_of_purchase" DATE NOT NULL DEFAULT CURRENT_DATE,
			"purchased_price" INT NOT NULL,
			"purchased_quantity" INT NOT NULL,
			FOREIGN KEY (item_id) REFERENCES bazaar_marketplace.items (id),
			FOREIGN KEY (sens_transaction_id) REFERENCES bazaar_marketplace.sens_transactions (id),
			FOREIGN KEY (purchased_by_id) REFERENCES bazaar_marketplace.users (id),
			FOREIGN KEY (purchased_from_id) REFERENCES bazaar_marketplace.users (id)
		)
	`),

	pgm.sql(`
		CREATE TABLE "bazaar_marketplace"."item_ratings" (
			"id" SERIAL PRIMARY KEY,
			"rater" INT NOT NULL,
			"item_id" INT NOT NULL,
			"value" INT NOT NULL,
			FOREIGN KEY (rater) REFERENCES bazaar_marketplace.users (id),
			FOREIGN KEY (item_id) REFERENCES bazaar_marketplace.users (id)
		)
	`),

	pgm.sql(`
		CREATE TABLE "bazaar_marketplace"."user_ratings" (
			"id" SERIAL PRIMARY KEY,
			"rater" INT NOT NULL,
			"user_id" INT NOT NULL,
			"value" INT NOT NULL,
			FOREIGN KEY (rater) REFERENCES bazaar_marketplace.users (id),
			FOREIGN KEY (user_id) REFERENCES bazaar_marketplace.users (id)
		)
	
	`)
};