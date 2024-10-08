import { prisma } from '$lib/api/prisma';
import { Project } from '@prisma/client';
import { error, RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async({ params }) => {
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
  return new Response(JSON.stringify(project), { status: 200 });
}
