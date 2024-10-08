import { prisma } from '$lib/api/prisma';
import { umi } from '@/lib/blockchain/backendUmi';
import { getPublicKey } from '@/lib/blockchain/utils';
import { fetchCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine';
import { PublicKey } from '@metaplex-foundation/umi';
import { Project } from '@prisma/client';
import { error, RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async({ params }) => {
  let project: Project | null;
  let candyMachineAddress: string;
  let treasuryAddress: string;
  let collectionAddress: string;
  let itemsTotal: bigint;
  let itemsAvailable: bigint;
  try {
    project = await prisma.project.findUnique({
      include: {
        images: true,
      },
      where: {
        id: params.slug,
      },
    });
    if (!project) {
      throw error(404, 'Not found');
    }
    const candyMachine = await prisma.candyMachine.findFirst({
      where: {
        projectId: project.id,
      },
    });
    if (!candyMachine) {
      throw error(404, 'Not found');
    }
    candyMachineAddress = getPublicKey(candyMachine.key);
    treasuryAddress = getPublicKey(candyMachine.treasuryKey);
    collectionAddress = getPublicKey(candyMachine.collectionKey);
    const candyMachineInstance = await fetchCandyMachine(umi, candyMachineAddress as PublicKey);
    itemsTotal = candyMachineInstance.data.itemsAvailable;
    itemsAvailable = itemsTotal - candyMachineInstance.itemsRedeemed;
  } catch {
    throw error(404, 'Not found');
  }
  return new Response(JSON.stringify({
    ...project,
    candyMachineAddress,
    treasuryAddress,
    collectionAddress,
    itemsTotal: itemsTotal.toString(),
    itemsAvailable: itemsAvailable.toString(),
  }), {
    status: 200
  });
}
