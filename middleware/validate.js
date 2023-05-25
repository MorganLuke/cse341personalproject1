const validator = require('../helpers/validate');

const saveProject = (req, res, next) => {
    const validationRule = {
        jeepName: 'required|string',
        projectName: 'required|string',
        description: 'required|string',
        partNeeded1: 'string',
        partNeeded2: 'string',
        partsOnhand: 'required|boolean',
        startDate: 'required|date',
        hoursToComplete: "required|integer"
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
  saveProject
};