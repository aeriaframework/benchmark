import {
  init,
  unsafe,
  makeRouter,
  defineCollection,
  defineDescription,
  useFunctions
} from 'sonata-api'

const [Person, personDescription] = defineDescription({
  $id: 'person',
  timestamps: false,
  required: [],
  properties: {
    name: {
      type: 'string'
    },
    hobby: {
      enum: [
        'soccer',
        'swimming',
        'running'
      ]
    }
  }
})

export const collections = {
  person: defineCollection(() => ({
    item: Person,
    description: personDescription,
    functions: useFunctions()([
      'insert',
      'getAll'
    ]),
    accessControl: {
      roles: {
        guest: {
          grantEverything: true
        }
      }
    }
  }))
}

const router = makeRouter({
  base: '/',
  exhaust: true
})

router.POST('/person', async (context) => {
  return unsafe(await context.collections.person.functions.insert({
    what: context.request.payload
  }))
})

router.GET('/person', async (context) => {
  return context.collections.person.functions.getAll({
    filters: context.request.payload
  })
})


init({}, (context) => {
  return router.install(context)
})
