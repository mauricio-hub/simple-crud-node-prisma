-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "tezt" VARCHAR(255) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
