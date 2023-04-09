-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('publish', 'draft');

-- CreateTable
CREATE TABLE "Post" (
    "postId" SERIAL NOT NULL,
    "postType" "PostType" NOT NULL,
    "title" TEXT NOT NULL,
    "anons" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL,
    "descriptionLink" TEXT NOT NULL,
    "quoteAuthor" TEXT NOT NULL,
    "tags" TEXT[],
    "isRepost" BOOLEAN NOT NULL DEFAULT false,
    "originalId" TEXT,
    "originalAuthor" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'publish',
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);
