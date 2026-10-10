import { ConvexError, v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('todos').withIndex('by_created_at').order('desc').collect();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').collect();
    const total = todos.length;
    const completed = todos.filter((todo) => todo.isCompleted).length;
    const active = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, active, completed, percentage };
  },
});

export const createTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const text = args.text.trim();

    if (!text) {
      throw new ConvexError('Текст завдання не може бути порожнім');
    }

    return await ctx.db.insert('todos', {
      text,
      isCompleted: false,
      createdAt: Date.now(),
    });
  },
});

export const toggleTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);

    if (!todo) {
      throw new ConvexError('Завдання не знайдено');
    }

    await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
  },
});

export const updateTodo = mutation({
  args: { id: v.id('todos'), text: v.string() },
  handler: async (ctx, args) => {
    const text = args.text.trim();

    if (!text) {
      throw new ConvexError('Текст завдання не може бути порожнім');
    }

    const todo = await ctx.db.get(args.id);

    if (!todo) {
      throw new ConvexError('Завдання не знайдено');
    }

    await ctx.db.patch(args.id, { text });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);

    if (!todo) {
      throw new ConvexError('Завдання не знайдено');
    }

    await ctx.db.delete(args.id);
  },
});

export const clearCompleted = mutation({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db
      .query('todos')
      .withIndex('by_completion', (queryBuilder) => queryBuilder.eq('isCompleted', true))
      .collect();

    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCount: todos.length };
  },
});

export const clearAll = mutation({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').collect();

    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCount: todos.length };
  },
});
