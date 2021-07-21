import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors'

const contactSchema = Yup.object({
  name: Yup.string()
    .required(),
  age: Yup.number()
    .required()
    .positive()
    .integer()
})

describe('Validation errors functions', () => {
  it('should be able to return the correct value for the validation function', async () => {
    const errors = await contactSchema.validate({
      name: 'Kenneth',
      age: '35'
    }).catch(function(err) {
      expect(getValidationErrors(err)).toBe(Yup.object)
    });

  });
});
