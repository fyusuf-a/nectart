import { umi } from "../src/lib/blockchain/backendUmi";
import { del, list } from '@vercel/blob';
import fs from 'fs';
import { seedPerfumes, UploadProject } from "./perfume";
import { exploreDirectory } from "../scripts/utils";
import { fileURLToPath } from 'url';
import path from 'path';
import { createProject } from "../src/lib/projects/utils";
import { FormSchemaType } from '../src/routes/projects/add/schema';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

const uploadProject = async (uploadProject: UploadProject, tokenNumber = 40, budget?: number) => {
  const keypair = umi.eddsa.generateKeypair();
  const publicKey = keypair.publicKey.toString();

  const user = await prisma.user.upsert({
    where: { address: publicKey },
    update: {},
    create: {
      address: publicKey,
    },
  });

  const file = fs.readFileSync(uploadProject.imagePath);
  const fileBlob = new Blob([file]);
  let formSchema: FormSchemaType = {
    ...uploadProject,
    picture: fileBlob,
    tokenNumber,
  }
  await createProject(formSchema, { user: { id: user.id } }, budget);
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  await exploreDirectory(`${__dirname}/../static/seed`, [1800]);
  while (true) {
    const blobList = await list();
    for (const blob of blobList.blobs) {
      del(blob.url);
    }
    if (!blobList.hasMore) {
      break;
    }
  }

  for (let i = 0; i < seedPerfumes.length; i++) {
    await uploadProject(seedPerfumes[i]);
  }
}


main();

