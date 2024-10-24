-- CreateTable
CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NoteTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NoteTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NoteTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Types" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Types_name_key" ON "Types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_NoteTypes_AB_unique" ON "_NoteTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_NoteTypes_B_index" ON "_NoteTypes"("B");
