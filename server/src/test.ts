import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const getDiscovery = async () => {
    const Category = await prisma.categories.findMany();
    let check = await prisma.quizzes.findMany({
        select : {
            quizQuestions : {
                select : {
                    question : {
                        select : {
                            category : true
                        }
                    }
                }
            }
        }
    })
    console.log(check)
}

getDiscovery();