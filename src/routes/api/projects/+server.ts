import { error, json, RequestHandler } from '@sveltejs/kit';
import { BUDGET_IN_SOL } from '$lib/constants';
import { formSchema, FormSchemaType } from '@/routes/projects/add/schema';
import { ZodError } from 'zod';
import { prisma } from '@/lib/api/prisma';
import { del, put } from '@vercel/blob';
import { Project } from '@prisma/client';

export const GET: RequestHandler = async() => {
  const projects = await prisma.project.findMany({
    include: {
      user: true,
      images: {
        take: 1,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return json(projects, { status: 200 });
}

export const POST: RequestHandler = async({ request, locals }) => {
  let result: FormSchemaType;
  try {
    const body = await request.formData();
    const data = JSON.parse(body.get('data') as string);
    result = formSchema.parse({
      ...data,
      picture: body.get('picture'),
    });
  } catch (e) {
    if (e instanceof ZodError) {
      const firstError = e.errors[0];
      const message = firstError.path.join('.') + ': ' + firstError.message;
      throw error(400, message);
    }
    throw error(400, 'Invalid body');
  }

  let project: Project | null = null;
  try {
    await prisma.$transaction(async (tx) => {
      project = await tx.project.create({
        data: {
          name: result.name,
          description: result.description,
          topNotes: result.topNotes,
          baseNotes: result.baseNotes,
          heartNotes: result.heartNotes,
          userId: locals.user.id,
          budgetInSol: BUDGET_IN_SOL,
        },
      });
      const { url } = await put(`projects/${project.id}/1`, result.picture, { access: 'public' });
      await tx.image.create({
        data: {
          url,
          projectId: project.id,
        },
      });
    });
  } catch (e) {
    if (project) {
      await del(`projects/${(project as Project).id}/1`);
    }
    throw e;
  }
  return json(project, { status: 200 });
}
