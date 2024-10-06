import { prisma } from "@/lib/api/prisma";
import { Project } from "@prisma/client";
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  let project: Project | null;
  try {
    project = await prisma.project.findUnique({
      include: {
        images: true,
      },
      where: {
        id: params.slug,
      },
    });
  } catch {
    throw error(404, 'Not found');
  }
  return {
    props: {
      project,
    },
  };
}
