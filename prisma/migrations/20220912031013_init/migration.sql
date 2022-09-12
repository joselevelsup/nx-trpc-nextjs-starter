-- CreateTable
CREATE TABLE "ToDos" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,

    CONSTRAINT "ToDos_pkey" PRIMARY KEY ("id")
);
