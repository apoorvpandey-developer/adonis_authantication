import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    phoneNo: vine
      .string()
      .trim()
      .minLength(7)
      .maxLength(20)
      .unique({ table: 'users', column: 'phone_no' }),
    email: vine
      .string()
      .trim()
      .email()
      .unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8).maxLength(64),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string(),
  })
)
