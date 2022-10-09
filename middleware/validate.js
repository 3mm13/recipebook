const validator = require('../helpers/validate');

const addUser = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        password: 'required|string',
        birthday: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const addRecipe = (req, res, next) => {
    const validationRule = {
        recipeName: 'required|string',
        mealType: 'required|string',
        recipeUrl: 'required|string',
        tips: ['string'],
        tasteRating: 'required|string',
        difficulty: 'required|string',
        timeNeeded: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    addUser,
    addRecipe
};