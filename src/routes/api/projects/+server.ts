import { error, json, type RequestHandler } from '@sveltejs/kit';
import { formSchema, type FormSchemaType } from '@/routes/projects/add/schema';
import { ZodError } from 'zod';
import { prisma } from '@/lib/api/prisma';
import { createProject } from '@/lib/projects/utils';

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
  let project = await createProject(result, locals);
  return json(project, { status: 200 });
}
