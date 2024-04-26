import { prisma } from "../../src/db/client";

async function run(){
    await prisma.role.create({data: {
        name: 'GUEST',
    }})
    await prisma.permission.create({data: {
        name: 'CREATE_TICKET',
        roleId: 1
    }})
}

run().catch(console.error)