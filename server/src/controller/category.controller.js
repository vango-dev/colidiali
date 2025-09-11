import CategoryModel from '../models/category.model.js';

// @Desc Get transporters categories
// @route GET /api/categories
// @access Private
export async function getTransporterCategoryHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  try {
    const categories = await CategoryModel.find({ transporterId }).sort({
      createdAt: 1,
    });

    res.status(200).json({ categories });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// @Desc Create a new category
// @route POST /api/categories/new
// @access Private
export async function addTransporterCategoryHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  const category = req.body;

  const newCategory = await CategoryModel.create({
    ...category,
    transporterId,
  });

  if (!newCategory) {
    return res.sendStatus(404);
  }

  const categories = await CategoryModel.find({ transporterId }).sort({
    createdAt: 1,
  });

  return res.json({ categories });
}

// @Desc Delete a category
// @route DELETE /api/categories/:categoryId/delete
// @access Private
export async function deleteTransporterCategoryHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  const { categoryId } = req.params;

  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    res.status(404).json({ message: 'Category introuvable' });
  }

  const response = await category.deleteOne({ _id: category._id });

  const categories = await CategoryModel.find({ transporterId }).sort({
    createdAt: 1,
  });

  if (response.acknowledged && response.deletedCount === 1) {
    res.status(200).json({
      categories,
      message: 'Suppression effectuée avec sucés',
    });
  }
}

// @desc Update a category
// @route PUT api/categories/:categoryId/update
// @access private
export async function updateTransporterCategoryHandler(req, res) {
  const transporterId = res.locals.user._doc._id;
  const { categoryId } = req.params;

  const update = req.body;

  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    return res.sendStatus(404);
  }

  const updatedCategory = await CategoryModel.findOneAndUpdate(
    { _id: categoryId, transporterId },
    update,
    { new: true }
  );

  if (!updatedCategory) {
    return res.sendStatus(404);
  }

  const categories = await CategoryModel.find({ transporterId }).sort({
    createdAt: 1,
  });

  return res.json({
    categories,
  });
}
