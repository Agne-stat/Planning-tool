import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getTodos().map((todo) => {
      return db.todo.create({ data: todo });
    })
  );
  await Promise.all(
    getDayPlan().map((dayPlan) => {
      return db.dayPlan.create({ data: dayPlan });
    })
  );
}

seed();

function getTodos() {
  return [
    {
      name: "Do dishes",
    },
  ];
}

function getDayPlan() {
  return [
    {
      name: "Meeting",
      startTime: '11:00',
    },
  ];
}