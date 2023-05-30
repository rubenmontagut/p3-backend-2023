import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const r1 = await prisma.restaurant.create({
  data: {
    name: "PizzaHut",
    address: "Carrer Arago, 50",
  },
});

console.log(`Created restaurant ${r1.name} (${r1.id})`);

const r2 = await prisma.restaurant.create({
  data: {
    name: "Sabor a Tango",
    address: "Carrer Diputacio, 12",
  },
});

console.log(`Created restaurant ${r2.name} (${r2.id})`);

const user = await prisma.user.create({
  data: {
    name: "Jaume",
    lastName: "Martín",
    email: "jaumemartin@gmail.com",
  },
});

console.log(`Created user ${user.name} ${user.lastName} (${user.id})`);

await prisma.product.createMany({
  data: [
    {
      name: "Patates braves",
      price: 2.5,
      description: "Patates amb salsa brava de la casa",
      restaurantId: r1.id,
    },
    {
      name: "Vi DO Terra Alta",
      price: 8.5,
      description: "Botella de vi garnatxa blanca",
      restaurantId: 1,
    },
  ],
});
