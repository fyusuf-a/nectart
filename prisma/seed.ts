import { PrismaClient } from "@prisma/client";
import { umi } from "../src/lib/blockchain/backendUmi";
import { del, list, put } from '@vercel/blob';
import fs from 'fs';
import { seedPerfumes, UploadProject } from "./perfume";
import { BUDGET_IN_SOL } from "../src/lib/constants";
import { exploreDirectory } from "../scripts/utils";
import { fileURLToPath } from 'url';
import path from 'path';

const prisma = new PrismaClient();

const uploadProject = async (uploadProject: UploadProject) => {
  const keypair = umi.eddsa.generateKeypair();
  const publicKey = keypair.publicKey.toString();
  const creator = await prisma.user.create({
    data: {
      address: publicKey,
    },
  });

  const project = await prisma.project.create({
    data: {
      name: uploadProject.name,
      description: uploadProject.description,
      baseNotes: uploadProject.baseNotes,
      heartNotes: uploadProject.heartNotes,
      topNotes: uploadProject.topNotes,
      userId: creator.id,
      budgetInSol: BUDGET_IN_SOL,
      tokenNumber: 500,
    }
  });
  const file = fs.readFileSync(uploadProject.imagePath);
  const fileBlob = new Blob([file]);
  const { url } = await put(`projects/${project.id}/1`, fileBlob, { access: 'public' });

  await prisma.image.create({
    data: {
      url,
      projectId: project.id,
    },
  });
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

  for (const seedPerfume of seedPerfumes) {
    await uploadProject(seedPerfume);
  }
}


main();

