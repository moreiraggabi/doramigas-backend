-- CreateTable
CREATE TABLE "user_drama" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dramaId" INTEGER NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isDropped" BOOLEAN NOT NULL DEFAULT false,
    "isWatching" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_drama_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_drama" ADD CONSTRAINT "user_drama_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_drama" ADD CONSTRAINT "user_drama_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "dramas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
