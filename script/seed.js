"use strict";

const {
  db,
  models: { User, Game },
} = require("../server/db");
const Invoice = require("../server/db/models/Invoice");
const InvoiceLine = require("../server/db/models/InvoiceLine");
const games = require("./games");
const invoiceLines = require("./invoiceLines");
const invoices = require("./invoices");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      firstName: "sakib",
      lastName: "hossain",
      username: "sakib",
      password: "123",
      isAdmin: true,
      email: "sakiba09@gmail.com",
    }),
    User.create({
      firstName: "michael",
      lastName: "orman",
      username: "michael",
      password: "123",
      isAdmin: true,
      email: "michaelorman61@gmail.com",
    }),
    User.create({
      firstName: "haram",
      lastName: "chang",
      username: "haram",
      password: "123",
      isAdmin: true,
      email: "harammchang@gmail.com",
    }),
    User.create({
      firstName: "jason",
      lastName: "nguyen",
      username: "jason",
      password: "123",
      isAdmin: true,
      email: "jt.nguyen14311@gmail.com",
    }),
    User.create({
      firstName: "benjamin",
      lastName: "lee",
      username: "ben",
      password: "123",
      isAdmin: true,
      email: "tweakss@gmail.com",
    }),
  ]);

  const createdGames = await Promise.all(
    games.map((game) => {
      return Game.create(game);
    })
  );

  // Don't need to automatically seed invoice
  // const createdInvoices = await Promise.all(
  //   invoices.map((invoice) => {
  //     return Invoice.create(invoice);
  //   })
  // )

  // Don't need dummy data for invoice lines
  // const createInvoiceLines = await Promise.all(
  //   invoiceLines.map((invoiceLine) => {
  //     return InvoiceLine.create(invoiceLine);
  //   })
  // )

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
