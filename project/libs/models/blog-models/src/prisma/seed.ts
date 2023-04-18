import {PrismaClient, PostType} from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.tag.upsert({
    where: {id: 1},
    update: {},
    create: {
      title: 'foo',
      posts: {
        create: [
          {
            postType: PostType.video,
            title: "First post",
            video: "http://video-link.local",
            userId: '15',
            likeCount: 5,
            commentCount: 0,
            comments: {
              create: [
                {
                  message: 'stupid comment',
                  userId: '14',
                }
              ]
            }
          },
        ]
      },
    }
  });
  await prisma.tag.upsert({
    where: {id: 2},
    update: {},
    create: {
      title: 'nodejs',
      posts: {
        create: [
          {
            postType: PostType.photo,
            photo: 'nodejs-image.png',
            userId: '16',
            likeCount: 12,
            commentCount: 7,
          },
        ]
      },
    }
  });
  await prisma.tag.upsert({
    where: {id: 3},
    update: {},
    create: {
      title: 'bar',
      posts:  {
        create: [
          {
            postType: PostType.text,
            title: 'Second post',
            anons: 'Anons for second post',
            text: 'Second post text',
            userId: '15',
            likeCount: 3,
            commentCount: 1,
            comments: {
              create: [
                {
                  message: 'Good post',
                  userId: '16',
                }
              ]
            }
          },
          {
            postType: PostType.photo,
            photo: 'fake-photo.jpg',
            userId: '15',
            likeCount: 0,
            commentCount: 0,
          }
        ]
      }
    }
  });
  await prisma.tag.upsert({
    where: {id: 4},
    update: {},
    create: {
      title: 'backend',
      posts: {
        create: [
          {
            postType: PostType.link,
            linkUrl: 'https://nodejs.org',
            descriptionLink: 'Official site nodejs',
            userId: '14',
            likeCount: 10,
            commentCount: 4,
          },
        ]
      },
    }
  });
  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();

    process.exit(1);
  });

