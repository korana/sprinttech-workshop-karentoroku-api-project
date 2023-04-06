-- CreateTable
CREATE TABLE "DateSlot" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DateSlot" ADD CONSTRAINT "DateSlot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
