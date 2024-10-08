import { Project } from '@prisma/client';

export type ProjectWithCandyMachine = Project & {
  itemsAvailable: string;
  itemsTotal: string;
  candyMachineAddress: string;
  treasuryAddress: string;
  collectionAddress: string;
}
