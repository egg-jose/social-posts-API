import { getRepository } from 'typeorm';

export default async (model, page, limit, order, condition) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  if (page > 1) {
    results.preview = {
      page: page - 1,
      limit: limit,
    };
  }

  if (endIndex < (await getRepository(model).count())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  const result = await getRepository(model).find({
    where: condition,
    order: order,
    take: limit,
    skip: startIndex,
  });

  results.results = result;

  return results;
};
