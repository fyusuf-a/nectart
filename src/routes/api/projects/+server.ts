import { error, json, RequestHandler } from '@sveltejs/kit';
import { formSchema, FormSchemaType } from '@/routes/projects/add/schema';
import { ZodError } from 'zod';
import { prisma } from '@/lib/api/prisma';

export const GET: RequestHandler = async() => {
  const projects = await prisma.project.findMany({
    include: {
      user: true,
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

  const project = await prisma.project.create({
    data: {
      name: result.name,
      description: result.description,
      topNotes: result.topNotes,
      baseNotes: result.baseNotes,
      heartNotes: result.heartNotes,
      userId: locals.user.id,
    },
  });
  return json(project, { status: 200 });
}
