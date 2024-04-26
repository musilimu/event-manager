import { ROLES } from "schema";
import { prisma } from "../../src/db/client";

async function run() {
    await prisma.role.create({
        data: {
            name: ROLES.ADMIN,
        }
    })

    const { id } = await prisma.role.create({
        data: {
            name: ROLES.GUEST,
        }
    })


    await prisma.permission.create({
        data: {
            name: 'CREATE_TICKET',
            roleId: id
        }
    })
}

run().catch(console.error)