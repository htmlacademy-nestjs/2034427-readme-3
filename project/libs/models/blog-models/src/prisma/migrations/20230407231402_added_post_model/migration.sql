/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "post_id" SERIAL NOT NULL,
    "post_type" "PostType" NOT NULL,
    "title" TEXT NOT NULL,
    "anons" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "description_link" TEXT NOT NULL,
    "quote_author" TEXT NOT NULL,
    "tags" TEXT[],
    "is_repost" BOOLEAN NOT NULL DEFAULT false,
    "original_id" TEXT,
    "original_author" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'publish',
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "comment_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);
