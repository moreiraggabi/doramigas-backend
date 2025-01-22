-- CreateTable
CREATE TABLE "actors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "photo" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actor_drama" (
    "id" SERIAL NOT NULL,
    "dramaId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "isProta" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actor_drama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_actor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "isKnown" BOOLEAN NOT NULL DEFAULT false,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "friendlyName" VARCHAR(100),
    "favoriteCharacter" VARCHAR(100),

    CONSTRAINT "user_actor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "actors_name_key" ON "actors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "actors_photo_key" ON "actors"("photo");

-- AddForeignKey
ALTER TABLE "actor_drama" ADD CONSTRAINT "actor_drama_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "dramas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actor_drama" ADD CONSTRAINT "actor_drama_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_actor" ADD CONSTRAINT "user_actor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_actor" ADD CONSTRAINT "user_actor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
